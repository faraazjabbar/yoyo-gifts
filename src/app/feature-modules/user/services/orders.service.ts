import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Order } from 'src/app/shared/models/orders.model';
import { map } from 'rxjs/operators';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { Gift } from 'src/app/shared/models/gift.model';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private http: HttpClient, private fbService: FirebaseService) {}

    getOrders(email): Observable<Order> {
        return this.http
            .get<Order>(environment.firebaseConfig.databaseURL + '/orders.json/?orderBy="email"&equalTo="' + email + '"')
            .pipe(
                map(data => {
                return { key: Object.keys(data)[0], ...Object.values(data)[0] };
                })
            );
    }

    updateOrder(order: Order) {
        return this.fbService.update('/orders', order);
    }

    addNewOrder(order: Order) {
        return this.fbService.add('/orders', order);
    }

    updateGift(gift: Gift) {
        return this.fbService.update('/gifts', gift);
    }

    getGiftByKey(key: string) {
        return this.fbService.getByKey('/gifts', key);
    }
}
