import { Component, OnInit, Input } from '@angular/core';
import { Review } from 'src/app/shared/models/gift.model';

@Component({
  selector: 'app-gift-review',
  templateUrl: './gift-review.component.html',
  styleUrls: ['./gift-review.component.scss']
})
export class GiftReviewComponent implements OnInit {

  @Input() review: Review;

  constructor() { }

  ngOnInit() {
  }

}
