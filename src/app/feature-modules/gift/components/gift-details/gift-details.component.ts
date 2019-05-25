import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState, GiftStoreActions, GiftStoreSelectors } from 'src/app/root-store';
import { tap, map, switchMap, filter } from 'rxjs/operators';
import { Subscription, Observable, of, forkJoin } from 'rxjs';
import { Gift } from 'src/app/shared/models/gift.model';
import { ActivatedRoute, NavigationStart, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Order, SentGift, RecievedGift } from 'src/app/shared/models/orders.model';
import { User, SendEmail } from './../../../../shared/models/user.model';
import { environment } from 'src/environments/environment';

import { OrdersService } from 'src/app/feature-modules/user/services/orders.service';
import { UserService } from 'src/app/feature-modules/user/services/user.service';
import { SpinnerService } from 'src/app/core/spinner/spinner.service';
import { EmailService } from 'src/app/core/services/email.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
    selector: 'app-gift-details',
    templateUrl: './gift-details.component.html',
    styleUrls: ['./gift-details.component.scss']
})
export class GiftDetailsComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];

    user: User;
    isSendGift = false;
    translation$: Observable<Object>;
    gift$: Observable<Gift>;
    gift: Gift;
    model: SendEmail;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<RootStoreState.State>,
        private alertService: AlertService,
        private emailService: EmailService,
        private orderService: OrdersService,
        private spinnerService: SpinnerService,
        private authService: AuthService,
        private userService: UserService
    ) {
        // Resolver guard spinner implement ...
        // Using router trigger i.e. NaviagationStart, NavigationEnd
        this.router.events.pipe(
            tap(routerEvent => {
                if (routerEvent instanceof NavigationStart) {
                    this.spinnerService.show();
                }
                if (routerEvent instanceof NavigationEnd) {
                    this.spinnerService.hide();
                }
            })
        ).subscribe();
    }

    private setUser() {
        this.subscriptions.push(
            this.authService.emitUserData.subscribe(data => {
                this.user = data;
            })
        );
    }

    private updateOrdersAndGift() {
        let senderOrder: Order;
        let recieverOrder: Order;
        let updateSenderOrderApi;
        let updateRecieverOrderApi;

        const sentGift: SentGift = {
            recieverName: this.model.name,
            revieverEmail: this.model.email,
            sentOn: new Date().toDateString(),
            ...this.gift
        };

        const recievedGift: RecievedGift = {
            senderEmail: this.user.email,
            senderName: this.user.userName,
            senderImage: this.user.imageLink,
            recievedOn: new Date().toDateString(),
            isRedeemed: false,
            isReviewed: false,
            ...this.gift
        };

    const recieverOrderApi = this.orderService.getOrders(this.model.email);
    const senderOderApi = this.orderService.getOrders(this.user.email);

    forkJoin([senderOderApi, recieverOrderApi])
        .pipe(
            switchMap(data => {
                if (data[0].key) {
                    senderOrder = data[0];
                } else {
                    senderOrder = { email: this.user.email, sent: [], recieved: [] };
                }
                if (!senderOrder.sent) {
                    senderOrder['sent'] = [];
                }
                senderOrder.sent.push(sentGift);

                if (data[1].key) {
                    recieverOrder = data[1];
                } else {
                    recieverOrder = { email: this.model.email, sent: [], recieved: [] };
                }
                if (!recieverOrder.recieved) {
                    recieverOrder['recieved'] = [];
                }
                recieverOrder.recieved.push(recievedGift);

                if (data[0].key) {
                    updateSenderOrderApi = this.orderService.updateOrder(senderOrder);
                } else {
                    updateSenderOrderApi = this.orderService.addNewOrder(senderOrder);
                }

                if (data[1].key) {
                    updateRecieverOrderApi = this.orderService.updateOrder(recieverOrder);
                } else {
                    updateRecieverOrderApi = this.orderService.addNewOrder(recieverOrder);
                }

                this.gift.count++;
                const updateGiftApi = this.orderService.updateGift(
                    JSON.parse(JSON.stringify(this.gift))
                );

                this.user.points -= this.gift.cost;
                const updateUserApi = this.userService.updateUser(this.user);

                forkJoin([updateSenderOrderApi, updateRecieverOrderApi, updateGiftApi, updateUserApi]).subscribe(
                    res => {
                        this.isSendGift = false;
                        localStorage.setItem('user', JSON.stringify(this.user));

                        this.authService.emitUserData.next(this.user);
                        this.alertService.success('Sent', 'Gift sent successfully.');
                        this.spinnerService.hide();
                    },
                    err => {
                        this.alertService.error('Failed to send gift.');
                        this.spinnerService.hide();
                    }
                );
                return data;
            })
        )
        .subscribe();
    }

    ngOnInit() {
        // Setting up the user ...
        this.setUser();

        // Initializing the send email model ...
        this.model = {name: '', email: '', messege: ''};

        // Fetching from local storage, if user logged in
        this.user = JSON.parse(localStorage.getItem('user'));

        // Accessing gift data from resolver route guard ...
        this.route.data.subscribe((data: { gift: Gift }) => {
            this.gift = data.gift;
        });

        // TODO: to refactored for NGRX state route change ...
        // const giftKey = 'giftKey';
        // this.gift$ = this.store.select(GiftStoreSelectors.getByKey(giftKey));
        // // Pushing obsersavation to unscribe it
        // this.subscriptions.push(
        //     this.store.select(GiftStoreSelectors.getError)
        //         .pipe(
        //             filter(error => error !== null),
        //             tap(error => this.alertService.error(error))
        //         )
        //         .subscribe()
        // );
        // // Dispatching Gift Store Actions ...
        // this.store.dispatch(new GiftStoreActions.GetGiftsRequestAction({}));
        // this.store.dispatch(new GiftStoreActions.GetGiftRequestAction({key: giftKey}));
    }

    ngOnDestroy() {
        // Unscribing all the subscriptions at one go ...
        this.subscriptions.forEach(eachSubcription => {
            if (eachSubcription) {
                eachSubcription.unsubscribe();
            }
        });
    }

    enableSendForm() {
        if (this.user.points >= this.gift.cost) {
            this.isSendGift = true;
        } else {
            this.alertService.error(
                'you dont have enough points to send this gift. Please buy some points.'
            );
        }
    }

    onSubmit() {
        // Showing loading ...
        this.spinnerService.show();

        const templateParams = {
            toemail: this.model.email,
            toname: this.model.name,
            fromname: environment.appName
        };

        // sending email with callback to update the orders
        this.emailService.send(this.model, templateParams, () => this.updateOrdersAndGift());
    }

    cancelSendGift() {
        this.isSendGift = false;
    }

    addToFavorites() {
        let isExists = false;
        if (this.user.favoriteGifts && this.user.favoriteGifts.length) {
            isExists =
                this.user.favoriteGifts.findIndex(
                    g => g.key === this.gift.key
                ) > -1;
        }
        if (isExists) {
            this.alertService.error('gift already exist in your favorites.');
        } else {
            this.user['favoriteGifts'] = this.user.favoriteGifts || [];
            this.user.favoriteGifts.push(this.gift);

            this.subscriptions.push(
                this.userService.updateUser(this.user).subscribe(
                    () => {
                        this.alertService.success(
                            'Success',
                            'Added to your favorites successfully.'
                        );

                        localStorage.setItem('user', JSON.stringify(this.user));
                        this.authService.emitUserData.next(
                            JSON.parse(JSON.stringify(this.user))
                        );
                    },
                    err => {
                        this.alertService.error(err);
                    }
                )
            );
        }
    }
}
