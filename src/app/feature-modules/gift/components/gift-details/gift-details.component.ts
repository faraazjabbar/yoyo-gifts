import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState, GiftStoreActions, GiftStoreSelectors } from 'src/app/root-store';
import { tap, map, switchMap, filter } from 'rxjs/operators';
import { Subscription, Observable, of, forkJoin } from 'rxjs';
import { Gift } from 'src/app/shared/models/gift.model';
import { ActivatedRoute, NavigationStart, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Order, SentGift, RecievedGift } from 'src/app/shared/models/orders.model';
import { OrdersService } from 'src/app/feature-modules/user/services/orders.service';
import { User, SendEmail } from './../../../../shared/models/user.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { EmailService } from 'src/app/core/services/email.service';
import { environment } from 'src/environments/environment';
import { SpinnerService } from 'src/app/core/spinner/spinner.service';

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
        private alertService: AlertService,
        private emailService: EmailService,
        private orderService: OrdersService,
        private store: Store<RootStoreState.State>,
        private spinner: SpinnerService,
    ) {
        // Resolver guard spinner implement ...
        // Using router trigger i.e. NaviagationStart, NavigationEnd
        this.router.events.pipe(
            tap(routerEvent => {
                if (routerEvent instanceof NavigationStart) {
                    this.spinner.show();
                }
                if (routerEvent instanceof NavigationEnd) {
                    this.spinner.hide();
                }
            })
        ).subscribe();
    }

    ngOnInit() {
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
        this.isSendGift = true;
    }

    onSubmit() {

        this.spinner.show();

        const templateParams = {
            toemail: this.model.email,
            toname: this.model.name,
            fromname: environment.appName
        };

        this.emailService.send(this.model, templateParams, () => this.updateOrdersAndGift());
    }

    cancelSendGift() {
        this.isSendGift = false;
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

                forkJoin([updateSenderOrderApi, updateRecieverOrderApi, updateGiftApi]).subscribe(
                    res => {
                        console.log(res);
                        this.spinner.hide();
                        this.isSendGift = false;
                        this.alertService.success('Gift Sent Successfully !!!', null);
                    },
                    err => {
                        this.spinner.hide();
                        this.alertService.error(err);
                    }
                );
                return data;
            })
        )
        .subscribe();
    }
}
