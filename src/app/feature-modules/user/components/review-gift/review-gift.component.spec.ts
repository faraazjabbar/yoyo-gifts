import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { AuthService } from 'src/app/core/auth/auth.service';
import { OrdersService } from '../../services/orders.service';
import { AlertService } from './../../../../core/services/alert.service';
import { ReviewGiftComponent } from './review-gift.component';
fdescribe('ReviewGiftComponent', () => {
    let component: ReviewGiftComponent;
    let fixture: ComponentFixture<ReviewGiftComponent>;
    beforeEach(() => {
        const mDBModalRefStub = { hide: () => ({}) };
        const authServiceStub = { emitUserData: { getValue: () => ({}) } };
        const ordersServiceStub = {
            getGiftByKey: arg1 => ({ pipe: () => ({ subscribe: () => ({}) }) }),
            updateGift: g1 => ({}),
            updateOrder: order1 => ({})
        };
        const alertServiceStub = {
            success: (string1, string2) => ({}),
            error: string1 => ({})
        };
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [ReviewGiftComponent],
            providers: [
                { provide: MDBModalRef, useValue: mDBModalRefStub },
                { provide: AuthService, useValue: authServiceStub },
                { provide: OrdersService, useValue: ordersServiceStub },
                { provide: AlertService, useValue: alertServiceStub }
            ]
        });
        fixture = TestBed.createComponent(ReviewGiftComponent);
        component = fixture.componentInstance;
    });
    it('can load instance', () => {
        expect(component).toBeTruthy();
    });
    it('rating defaults to: 0', () => {
        expect(component.rating).toEqual(0);
    });

    it('subscribe and load the user', () => {
        fixture.detectChanges();
        expect(component.user).toBe({
            key: 'a',
            email: 'a',
            imageLink: 'a',
            isAdmin: true,
            points: 10000,
            userId: 'a',
            userName: 'a'
        });
    });

    // describe('sendReview', () => {
    //     it('should emit the review', () => {
    //         component.action.subscribe(d => {
    //             expect(d).toEqual({
    //                 userId: 'a',
    //                 userName: 'a',
    //                 userImage: 'a',
    //                 userReview: 'a',
    //                 userRating: 0,
    //                 reviewedOn: new Date().toDateString()
    //             });
    //         });
    //         component.user = {
    //             key: 'a',
    //             email: 'a',
    //             imageLink: 'a',
    //             isAdmin: true,
    //             points: 10000,
    //             userId: 'a',
    //             userName: 'a'
    //         };
    //         component.rating = 0;
    //         component.review = 'a';

    //         component.sendReview();
    //     });
    // });
});
