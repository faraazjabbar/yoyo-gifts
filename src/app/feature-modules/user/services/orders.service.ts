import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Order } from 'src/app/shared/models/orders.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  public getOrders(email): Observable<Order> {
    return this.http
      .get<Order>(
        environment.firebaseConfig.databaseURL +
          '/orders.json/?orderBy="email"&equalTo="' +
          email +
          '"'
      )
      .pipe(
        map(data => {
          return Object.values(data)[0];
        })
      );
  }
}
