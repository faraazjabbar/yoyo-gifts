import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SentGift, Order } from 'src/app/shared/models/orders.model';

@Component({
    selector: 'app-sent-gifts',
    templateUrl: './sent-gifts.component.html',
    styleUrls: ['./sent-gifts.component.scss']
})
export class SentGiftsComponent implements OnInit, OnChanges {
    @Input()
    orders: Order;
    public sentGifts: SentGift[];
    public noData = false;

    constructor() {}

    ngOnInit() {}

    ngOnChanges() {
        this.sentGifts = this.orders && this.orders.sent;
        if (!this.sentGifts || !this.sentGifts.length) {
            this.noData = true;
        } else {
            this.noData = false;
        }
    }

    public formatDate(date): string {
        return new Date(date).toLocaleDateString();
    }
}
