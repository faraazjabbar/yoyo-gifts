import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, Pipe, PipeTransform, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/feature-modules/user/services/orders.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { TranslationService } from 'src/app/core/services/translation.service';
import { GiftDetailsComponent } from './gift-details.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

@Pipe({ name: 'translate' })
class MockTranslatePipe implements PipeTransform {
    transform(value: string): string {
        //Do stuff here, if you want
        return value;
    }
}

fdescribe('GiftDetailsComponent', () => {
    let component: GiftDetailsComponent;
    let fixture: ComponentFixture<GiftDetailsComponent>;
    let router: Router;
    beforeEach(() => {
        const activatedRouteStub = {
            data: { subscribe: () => ({}) }
        };
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
        const translationServiceStub = {
            getTranslation: (string1, string2, string3) => ({})
        };
        TestBed.configureTestingModule({
            declarations: [GiftDetailsComponent, MockTranslatePipe],
            imports: [HttpClientTestingModule, FormsModule],
            providers: [
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: OrdersService, useValue: ordersServiceStub },
                { provide: AlertService, useValue: alertServiceStub }
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        });
        fixture = TestBed.createComponent(GiftDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


    // it('can load instance', () => {
    //     expect(component).toBeTruthy();
    // });

    // it(`should create`, async(inject([HttpTestingController, OrdersService],
    //     (httpClient: HttpTestingController, orderService: OrdersService) => {
    //     expect(orderService).toBeTruthy();
    // })));

    // it('isSendGift defaults to: false', () => {
    //     expect(component.isSendGift).toEqual(false);
    // });

    // describe('ngOnInit', () => {
    //     it('makes expected router actiated data', () => {
    //         const ActivatedRouteStub: ActivatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    //         spyOn(ActivatedRouteStub, 'data').and.callThrough();
    //         component.ngOnInit();
    //         expect(ActivatedRouteStub.data).toHaveBeenCalled();
    //     });
    // });

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
