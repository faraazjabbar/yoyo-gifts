import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Gift } from '../../models/gift.model';

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.scss']
})
export class GiftCardComponent implements OnInit {
  @Input() gift: Gift;
  @Input() isAdmin;
  @Output() deleteEvent = new EventEmitter<Gift>();
  @Output() editEvent = new EventEmitter<Gift>();

  constructor() {}

  ngOnInit() {
    console.log(this.gift);
  }
  onEdit() {
    this.editEvent.emit(this.gift);
  }

  onDelete() {
    this.deleteEvent.emit(this.gift);
  }
}
