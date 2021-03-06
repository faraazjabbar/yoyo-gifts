import {
    Component,
    OnInit,
    Input,
    OnChanges,
    Output,
    EventEmitter,
    OnDestroy
} from '@angular/core';
import { RecievedGift, Order } from 'src/app/shared/models/orders.model';
import { OrdersService } from '../../services/orders.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ReviewGiftComponent } from '../review-gift/review-gift.component';
import { Subscription, forkJoin } from 'rxjs';
import { switchMap, mergeMap, tap, catchError } from 'rxjs/operators';
import { Review, Gift } from 'src/app/shared/models/gift.model';
import { AlertService } from './../../../../core/services/alert.service';

@Component({
    selector: 'app-recieved-gifts',
    templateUrl: './recieved-gifts.component.html',
    styleUrls: ['./recieved-gifts.component.scss']
})
export class RecievedGiftsComponent implements OnInit, OnChanges, OnDestroy {
    @Input() orders: Order;
    public recievedGifts: RecievedGift[];
    public noData = false;
    public modalRef: MDBModalRef;
    private reviewSubscription: Subscription;

    private modalOptions = {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: false,
        ignoreBackdropClick: true,
        class: '',
        containerClass: '',
        animated: true,
        data: {}
    };

    constructor(
        private modalService: MDBModalService,
        private orderService: OrdersService,
        private alertService: AlertService
    ) {}

    ngOnInit() {}

    ngOnChanges() {
        this.recievedGifts = this.orders && this.orders.recieved;
        if (!this.recievedGifts || !this.recievedGifts.length) {
            this.noData = true;
        } else {
            this.noData = false;
        }
    }

    ngOnDestroy() {
        if (this.reviewSubscription) {
            this.reviewSubscription.unsubscribe();
        }
    }

    public formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

    public redeem(gift: RecievedGift) {
        gift.isRedeemed = true;
        this.orderService.updateOrder(this.orders).subscribe(
            data => {
                console.log(data);
                this.alertService.success(
                    'Success',
                    'Gift redeemed successfully.'
                );
            },
            err => {
                this.alertService.error(err);
            }
        );
    }

    public review(gift: RecievedGift) {
        this.modalOptions.data = {
            content: { gift: gift, order: this.orders }
        };
        this.modalRef = this.modalService.show(
            ReviewGiftComponent,
            this.modalOptions
        );
        // this.reviewSubscription = this.modalRef.content.action.subscribe(
        //     data => {
        //         if (data) {
        //             gift.isReviewed = true;
        //             this.orderService
        //                 .getGiftByKey(gift.key)
        //                 .pipe(
        //                     tap((g: Gift) => {
        //                         g['key'] = gift.key;
        //                         const reviews: Review[] = g.reviews || [];
        //                         reviews.push(data);
        //                         if (reviews.length) {
        //                             g.rating = Math.round(
        //                                 reviews.reduce((a, b) => {
        //                                     return a + b.userRating;
        //                                 }, 0) / reviews.length
        //                             );
        //                         }
        //                         g['reviews'] = reviews;
        //                         const giftApi = this.orderService.updateGift(g);
        //                         const orderApi = this.orderService.updateOrder(
        //                             this.orders
        //                         );
        //                         const apiArray = [orderApi, giftApi];
        //                         forkJoin(apiArray).subscribe(res => {
        //                             this.modalRef.hide();
        //                             this.alertService.success(
        //                                 'Success',
        //                                 'Review submitted successfully.'
        //                             );
        //                         });
        //                     })
        //                 )
        //                 .subscribe();
        //         }
        //     },
        //     err => {
        //         this.alertService.error(err);
        //     }
        // );
    }
}
