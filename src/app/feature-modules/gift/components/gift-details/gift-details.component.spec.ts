import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/feature-modules/user/services/orders.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { GiftDetailsComponent } from './gift-details.component';
fdescribe('GiftDetailsComponent', () => {
    let component: GiftDetailsComponent;
    let fixture: ComponentFixture<GiftDetailsComponent>;
    beforeEach(() => {
        const storeStub = {};
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
            { provide: Store, useValue: storeStub },
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
});
