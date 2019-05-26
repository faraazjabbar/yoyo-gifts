import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { RecievedGift } from 'src/app/shared/models/orders.model';
import { Subject, forkJoin } from 'rxjs';
import { Review, Gift } from 'src/app/shared/models/gift.model';
import { User } from 'src/app/shared/models/user.model';
import { componentFactoryName } from '@angular/compiler';
import { AuthService } from 'src/app/core/auth/auth.service';
import { OrdersService } from '../../services/orders.service';
import { AlertService } from './../../../../core/services/alert.service';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-review-gift',
    templateUrl: './review-gift.component.html',
    styleUrls: ['./review-gift.component.scss']
})
export class ReviewGiftComponent implements OnInit {
    public rating = 0;
    public review: string;
    public content;
    public action: Subject<any> = new Subject();
    public user: User;

    constructor(
        public modalRef: MDBModalRef,
        private authService: AuthService,
        private orderService: OrdersService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.user = this.authService.emitUserData.getValue();
    }

    public getRating(rating: number): void {
        this.rating = rating;
    }

    public sendReview() {
        const review: Review = {
            userId: this.user.key,
            userName: this.user.userName,
            userImage: this.user.imageLink,
            userReview: this.review || null,
            userRating: this.rating,
            reviewedOn: new Date().toDateString()
        };
        // this.action.next(review);
        const gift = this.content.gift;
        const order = this.content.order;
        gift.isReviewed = true;
        this.orderService
            .getGiftByKey(gift.key)
            .pipe(
                tap((g: Gift) => {
                    if (g) {
                        g['key'] = gift.key;
                        const reviews: Review[] = g.reviews || [];
                        reviews.push(review);
                        if (reviews.length) {
                            g.rating = Math.round(
                                reviews.reduce((a, b) => {
                                    return a + b.userRating;
                                }, 0) / reviews.length
                            );
                        }
                        g['reviews'] = reviews;
                        const giftApi = this.orderService.updateGift(g);
                        const orderApi = this.orderService.updateOrder(order);
                        const apiArray = [orderApi, giftApi];
                        forkJoin(apiArray).subscribe(res => {
                            this.modalRef.hide();
                            this.alertService.success(
                                'Success',
                                'Review submitted successfully.'
                            );
                        });
                    } else {
                        this.alertService.error(
                            'Sorry this gift is no longer available on the site.'
                        );
                        gift.isReviewed = false;
                        this.modalRef.hide();
                    }
                })
            )
            .subscribe();
    }
}
