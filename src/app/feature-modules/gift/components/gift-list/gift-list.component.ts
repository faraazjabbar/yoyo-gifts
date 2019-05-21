import { GiftService } from './../../services/gift.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.scss']
})
export class GiftListComponent implements OnInit {

  constructor(private giftService: GiftService) { }

  ngOnInit() {
    this.giftService.getGiftByKey({key: '-LfIigQjjdKusws13mRo'});
  }

}
