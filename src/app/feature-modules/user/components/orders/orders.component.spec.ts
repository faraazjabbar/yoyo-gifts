import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { OrdersComponent } from './orders.component';
describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  beforeEach(() => {
    const ordersServiceStub = {
      getOrders: arg1 => ({ subscribe: () => ({}) }),
      updateOrder: arg1 => ({ subscribe: () => ({}) }),
      updateGift: arg1 => ({})
    };
    const authServiceStub = { emitUserData: { getValue: () => ({}) } };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [OrdersComponent],
      providers: [
        { provide: OrdersService, useValue: ordersServiceStub },
        { provide: AuthService, useValue: authServiceStub }
      ]
    });
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('noData defaults to: false', () => {
    expect(component.noData).toEqual(false);
  });
  it('selectedTab defaults to: true', () => {
    expect(component.selectedTab).toEqual(true);
  });
});
