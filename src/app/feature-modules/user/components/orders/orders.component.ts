import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'firebase';
import { AuthService } from './../../../../core/services/auth.service';
import { OrdersService } from '../../services/orders.service';
import {
  Order,
  SentGift,
  RecievedGift
} from 'src/app/shared/models/orders.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  private user: User;
  public noData = false;
  public orders: Order;
  public sentGifts: SentGift[] = [];
  public recievedGifts: RecievedGift[] = [];
  public selectedTab = 0;

  constructor(
    private authService: AuthService,
    private orderService: OrdersService
  ) {}

  ngOnInit() {
    this.user = this.authService.emitUserData.getValue();
    if (this.user) {
      this.getOrders();
    } else {
      this.noData = true;
    }
  }

  private getOrders() {
    this.orderService.getOrders(this.user.email).subscribe((data: Order) => {
      this.orders = data;
      this.sentGifts = this.orders.sent;
      this.recievedGifts = this.orders.recieved;
    });
  }

  public tabClick(tab) {
    this.selectedTab = tab;
  }
}
