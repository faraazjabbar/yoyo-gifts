import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Gift } from '../../models/gift.model';

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.scss']
})
export class GiftCardComponent implements OnInit {
  gift: Gift = {
    brandId: '-LfIdeIyqlhjpbpw_YPl',
    brandName: 'Amazon',
    categoryId: '-LfIa4GVaSL9wz4xas9c',
    categoryName: 'Ecommerce',
    cost: 1000,
    count: 10,
    description: 'Amazon gift voucher worth 1000 rs.',
    discount: 10,
    giftName: 'Amazon gift voucher',
    imageLink: 'https://firebasestorage.googleapis.com/v0/b/yoyo-gift.appspot.com/o/amazon-logo-500500._V327001990_.jpg?alt=media&token=8f238527-0575-4fdb-ba3f-191f3daf320a',
    rating: 4
  };
  adminMode = true;
  @Output() deleteEvent = new EventEmitter<Gift>();
  @Output() editEvent = new EventEmitter<Gift>();
  constructor() { }

  ngOnInit() {
  }
  onEdit() {
    this.editEvent.emit(this.gift);
  }

  onDelete() {
    this.deleteEvent.emit(this.gift);
  }

}
