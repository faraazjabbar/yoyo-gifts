import { SpinnerService } from './../../../../core/spinner/spinner.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'firebase';
import { OrdersService } from '../../services/orders.service';
import {
  Order,
  SentGift,
  RecievedGift
} from 'src/app/shared/models/orders.model';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Review } from 'src/app/shared/models/gift.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  private user: User;
  public noData = false;
  public orders: Order;
  public sentSection;

  public selectedTab = true;

  constructor(
    private authService: AuthService,
    private orderService: OrdersService,
    private spinnerService: SpinnerService
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
    this.spinnerService.show();
    this.orderService.getOrders(this.user.email).subscribe((data: Order) => {
      this.orders = data;
      this.spinnerService.hide();
    });
  }

  public tabClick(tab) {
    this.selectedTab = tab === 0 ? true : false ;
  }

  public getUpdatedData(event) {
    const apiArray = [];
    const orderUpdateApi = this.orderService.updateOrder(this.orders);
    apiArray.push(orderUpdateApi);
    if (event.gift) {
      const giftUpdateApi = this.orderService.updateGift(event.gift);
      apiArray.push(giftUpdateApi);
    }

    this.orderService.updateOrder(this.orders).subscribe(data => {
      console.log(data);
    });
  }
}
