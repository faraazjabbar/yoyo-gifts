import { SpinnerService } from './../../../../core/spinner/spinner.service';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Order } from 'src/app/shared/models/orders.model';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
    public user: User;
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

    public getOrders() {
        this.spinnerService.show();
        this.orderService
            .getOrders(this.user.email)
            .subscribe((data: Order) => {
                this.orders = data;
                this.spinnerService.hide();
            });
    }

    public tabClick(tab) {
        this.selectedTab = !tab;
    }
}
