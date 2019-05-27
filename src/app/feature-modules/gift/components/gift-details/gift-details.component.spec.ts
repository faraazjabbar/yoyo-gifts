import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/feature-modules/user/services/orders.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { GiftDetailsComponent } from './gift-details.component';

describe('GiftDetailsComponent', () => {
    let component: GiftDetailsComponent;
    let fixture: ComponentFixture<GiftDetailsComponent>;
    beforeEach(() => {
        const activatedRouteStub = { data: { subscribe: () => ({}) } };
        const ordersServiceStub = {
            getOrders: arg1 => ({}),
            updateOrder: senderOrder1 => ({}),
            addNewOrder: senderOrder1 => ({}),
            updateGift: arg1 => ({})
        };
        const alertServiceStub = {
            success: (string1, string2) => ({}),
            error: string1 => ({})
        };
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [GiftDetailsComponent],
            providers: [
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: OrdersService, useValue: ordersServiceStub },
                { provide: AlertService, useValue: alertServiceStub }
            ]
        });
        fixture = TestBed.createComponent(GiftDetailsComponent);
        component = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(component).toBeTruthy();
    });

    it('isSendGift defaults to: false', () => {
        expect(component.isSendGift).toEqual(false);
    });

    describe('ngOnInit', () => {
        it('makes expected router actiated data', () => {
            const ActivatedRouteStub: ActivatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
            spyOn(ActivatedRouteStub, 'data').and.callThrough();
            component.ngOnInit();
            expect(ActivatedRouteStub.data).toHaveBeenCalled();
        });
    });

    describe('onSubmit', () => {
        it('makes expected add update order', () => {
            const orderServiceStub: OrdersService = fixture.debugElement.injector.get(OrdersService);
            spyOn(orderServiceStub, 'getOrders').and.callThrough();
            spyOn(orderServiceStub, 'addNewOrder').and.callThrough();
            spyOn(orderServiceStub, 'updateOrder').and.callThrough();
            component.onSubmit();
            expect(orderServiceStub.addNewOrder).toHaveBeenCalled();
            expect(orderServiceStub.updateOrder).toHaveBeenCalled();
        });
      });
});
