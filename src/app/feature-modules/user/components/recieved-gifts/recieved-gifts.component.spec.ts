import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RecievedGift } from 'src/app/shared/models/orders.model';
import { OrdersService } from '../../services/orders.service';
import { MDBModalService } from 'angular-bootstrap-md';
import { AlertService } from './../../../../core/services/alert.service';
import { RecievedGiftsComponent } from './recieved-gifts.component';
describe('RecievedGiftsComponent', () => {
  let component: RecievedGiftsComponent;
  let fixture: ComponentFixture<RecievedGiftsComponent>;
  beforeEach(() => {
    const recievedGiftStub = { isRedeemed: {}, isReviewed: {}, key: {} };
    const ordersServiceStub = {
      updateOrder: arg1 => ({ subscribe: () => ({}) }),
      getGiftByKey: arg1 => ({ pipe: () => ({ subscribe: () => ({}) }) }),
      updateGift: g1 => ({})
    };
    const mDBModalServiceStub = { show: (reviewGiftComponent1, arg2) => ({}) };
    const alertServiceStub = {
      success: (string1, string2) => ({}),
      error: err1 => ({})
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RecievedGiftsComponent],
      providers: [
        { provide: RecievedGift, useValue: recievedGiftStub },
        { provide: OrdersService, useValue: ordersServiceStub },
        { provide: MDBModalService, useValue: mDBModalServiceStub },
        { provide: AlertService, useValue: alertServiceStub }
      ]
    });
    fixture = TestBed.createComponent(RecievedGiftsComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('noData defaults to: false', () => {
    expect(component.noData).toEqual(false);
  });
  describe('redeem', () => {
    it('makes expected calls', () => {
      const ordersServiceStub: OrdersService = fixture.debugElement.injector.get(
        OrdersService
      );
      const alertServiceStub: AlertService = fixture.debugElement.injector.get(
        AlertService
      );
      spyOn(ordersServiceStub, 'updateOrder').and.callThrough();
      spyOn(alertServiceStub, 'success').and.callThrough();
      spyOn(alertServiceStub, 'error').and.callThrough();
      component.redeem(recievedGiftStub);
      expect(ordersServiceStub.updateOrder).toHaveBeenCalled();
      expect(alertServiceStub.success).toHaveBeenCalled();
      expect(alertServiceStub.error).toHaveBeenCalled();
    });
  });
  describe('review', () => {
    it('makes expected calls', () => {
      const ordersServiceStub: OrdersService = fixture.debugElement.injector.get(
        OrdersService
      );
      const mDBModalServiceStub: MDBModalService = fixture.debugElement.injector.get(
        MDBModalService
      );
      const alertServiceStub: AlertService = fixture.debugElement.injector.get(
        AlertService
      );
      spyOn(ordersServiceStub, 'getGiftByKey').and.callThrough();
      spyOn(ordersServiceStub, 'updateGift').and.callThrough();
      spyOn(ordersServiceStub, 'updateOrder').and.callThrough();
      spyOn(mDBModalServiceStub, 'show').and.callThrough();
      spyOn(alertServiceStub, 'success').and.callThrough();
      spyOn(alertServiceStub, 'error').and.callThrough();
      component.review(recievedGiftStub);
      expect(ordersServiceStub.getGiftByKey).toHaveBeenCalled();
      expect(ordersServiceStub.updateGift).toHaveBeenCalled();
      expect(ordersServiceStub.updateOrder).toHaveBeenCalled();
      expect(mDBModalServiceStub.show).toHaveBeenCalled();
      expect(alertServiceStub.success).toHaveBeenCalled();
      expect(alertServiceStub.error).toHaveBeenCalled();
    });
  });
});
