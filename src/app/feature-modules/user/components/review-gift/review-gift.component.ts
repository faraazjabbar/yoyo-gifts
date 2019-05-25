import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { RecievedGift } from 'src/app/shared/models/orders.model';
import { Subject } from 'rxjs';
import { Review } from 'src/app/shared/models/gift.model';
import { User } from 'src/app/shared/models/user.model';
import { componentFactoryName } from '@angular/compiler';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
    selector: 'app-review-gift',
    templateUrl: './review-gift.component.html',
    styleUrls: ['./review-gift.component.scss']
})
export class ReviewGiftComponent implements OnInit {
    public rating = 0;
    public review: string;
    public content: RecievedGift;
    public action: Subject<any> = new Subject();
    public user: User;

    constructor(
        public modalRef: MDBModalRef,
        private authService: AuthService
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
            userReview: this.review,
            userRating: this.rating,
            reviewedOn: new Date().toDateString()
        };
        this.action.next(review);
    }
}
