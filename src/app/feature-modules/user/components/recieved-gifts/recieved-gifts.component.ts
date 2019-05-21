import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { RecievedGift } from 'src/app/shared/models/orders.model';

@Component({
  selector: 'app-recieved-gifts',
  templateUrl: './recieved-gifts.component.html',
  styleUrls: ['./recieved-gifts.component.scss']
})
export class RecievedGiftsComponent implements OnInit, OnChanges {
  @Input() recievedGifts: RecievedGift[];
  public noData = false;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    if (!this.recievedGifts || !this.recievedGifts.length) {
      this.noData = true;
    } else {
      this.noData = false;
    }
  }

  public formatDate(date) {
    return new Date(date).toLocaleDateString();
  }

  public redeem(gift: RecievedGift) {}

  public review(gift: RecievedGift) {}
}
