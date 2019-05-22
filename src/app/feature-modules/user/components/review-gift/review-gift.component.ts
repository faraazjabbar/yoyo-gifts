import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { RecievedGift } from 'src/app/shared/models/orders.model';
import { Subject } from 'rxjs';
import { Review } from 'src/app/shared/models/gift.model';
import { User } from 'src/app/shared/models/user.model';

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

  constructor(public modalRef: MDBModalRef) {}

  ngOnInit() {}

  public getRating(rating: number): void {
    this.rating = rating;
  }

  public sendReview() {
    const user: User = JSON.parse(sessionStorage.getItem('user'));
    const review: Review = {
      userId: user.key,
      userName: user.userName,
      userImage: user.imageLink,
      userReview: this.review,
      userRating: this.rating,
      reviewedOn: new Date().toDateString()
    };
    this.action.next(review);
  }
}
