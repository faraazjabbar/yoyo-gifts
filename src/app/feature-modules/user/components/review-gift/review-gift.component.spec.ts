import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { AuthService } from 'src/app/core/auth/auth.service';
import { OrdersService } from '../../services/orders.service';
import { AlertService } from './../../../../core/services/alert.service';
import { ReviewGiftComponent } from './review-gift.component';
import { Observable, of, forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
describe('ReviewGiftComponent', () => {
    let component: ReviewGiftComponent;
    let fixture: ComponentFixture<ReviewGiftComponent>;
    beforeEach(() => {
        const mDBModalRefStub = { hide: () => ({}) };
        const authServiceStub = {
            emitUserData: {
                getValue: () => ({
                    key: 'a',
                    email: 'a',
                    imageLink: 'a',
                    isAdmin: true,
                    points: 10000,
                    userId: 'a',
                    userName: 'a'
                })
            }
        };
        const ordersServiceStub = {
            getGiftByKey: arg1 => ({
                pipe: () => ({
                    tap: () =>
                        of({
                            brandId: '-LfIdeIyqlhjpbpw_YPl',
                            brandName: 'Amazon',
                            categoryId: '-LfIa4GVaSL9wz4xas9c',
                            categoryName: 'Ecommerce',
                            cost: 2000,
                            count: 10,
                            description: 'Amazon gift voucher worth 2000 rs.',
                            discount: 10,
                            giftName: 'Amazon gift voucher',
                            imageLink:
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp3GHlaw4lNLDai56mArBP8h2Q9t27Z6iJCh6sWhBzPqEcg0Ey'
                        }),
                    subscribe: () => {}
                })
            }),
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

    // it('subscribe and load the user', () => {
    //     fixture.detectChanges();
    //     expect(component.user).toBe({
    //         key: 'a',
    //         email: 'a',
    //         imageLink: 'a',
    //         isAdmin: true,
    //         points: 10000,
    //         userId: 'a',
    //         userName: 'a'
    //     });
    // });

    describe('sendReview', () => {
        it('should emit the review', () => {
            component.user = {
                key: 'a',
                email: 'a',
                imageLink: 'a',
                isAdmin: true,
                points: 10000,
                userId: 'a',
                userName: 'a'
            };

            component.rating = 0;
            component.review = 'a';

            component.content = {
                gift: {
                    brandId: '-LfIdeIyqlhjpbpw_YPl',
                    brandName: 'Amazon',
                    categoryId: '-LfIa4GVaSL9wz4xas9c',
                    categoryName: 'Ecommerce',
                    cost: 2000,
                    count: 10,
                    description: 'Amazon gift voucher worth 2000 rs.',
                    discount: 10,
                    giftName: 'Amazon gift voucher',
                    imageLink:
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp3GHlaw4lNLDai56mArBP8h2Q9t27Z6iJCh6sWhBzPqEcg0Ey',
                    isRedeemed: false,
                    isReviewed: false,
                    key: '-LfJ5QOowN3YbPRFRkSL',
                    rating: 4,
                    recievedOn: '2019-05-21T06:29:32.742Z',
                    senderEmail: 'faraaz.jabbar@gmail.com',
                    senderName: 'Faraaz jabbar'
                },
                order: {
                    email: 'teja.pvt@gmail.com',
                    recieved: [
                        {
                            brandId: '-LfIdeIyqlhjpbpw_YPl',
                            brandName: 'Amazon',
                            categoryId: '-LfIa4GVaSL9wz4xas9c',
                            categoryName: 'Ecommerce',
                            cost: 2000,
                            count: 10,
                            description: 'Amazon gift voucher worth 2000 rs.',
                            discount: 10,
                            giftName: 'Amazon gift voucher',
                            imageLink:
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp3GHlaw4lNLDai56mArBP8h2Q9t27Z6iJCh6sWhBzPqEcg0Ey',
                            isRedeemed: false,
                            isReviewed: false,
                            key: '-LfJ5QOowN3YbPRFRkSL',
                            rating: 4,
                            recievedOn: '2019-05-21T06:29:32.742Z',
                            senderEmail: 'faraaz.jabbar@gmail.com',
                            senderName: 'Faraaz jabbar'
                        }
                    ],
                    sent: [
                        {
                            brandId: '-LfIdeIyqlhjpbpw_YPl',
                            brandName: 'Amazon',
                            categoryId: '-LfIa4GVaSL9wz4xas9c',
                            categoryName: 'Ecommerce',
                            cost: 2000,
                            count: 10,
                            description: 'Amazon gift voucher worth 2000 rs.',
                            discount: 10,
                            giftName: 'Amazon gift voucher',
                            imageLink:
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp3GHlaw4lNLDai56mArBP8h2Q9t27Z6iJCh6sWhBzPqEcg0Ey',
                            rating: 4,
                            recieverName: 'Faraaz jabbar',
                            revieverEmail: 'faraaz.jabbar@gmail.com',
                            sentOn: '2019-05-21T06:29:32.742Z'
                        }
                    ]
                }
            };

            const ordersServiceStub = fixture.debugElement.injector.get(
                OrdersService
            );

            // const mDBModalRefStub = fixture.debugElement.injector.get(
            //     MDBModalRef
            // );
            // const alertServiceStub = fixture.debugElement.injector.get(
            //     AlertService
            // );

            spyOn(ordersServiceStub, 'getGiftByKey')
                .and // .callThrough();
                .callThrough();

            // spyOn(ordersServiceStub, 'updateGift').and.callThrough();
            // spyOn(ordersServiceStub, 'updateOrder').and.callThrough();
            // spyOn(mDBModalRefStub, 'hide').and.callThrough();
            // spyOn(alertServiceStub, 'success').and.callThrough();
            component.sendReview();

            expect(ordersServiceStub.getGiftByKey).toHaveBeenCalled();
            // expect(
            //     forkJoin(
            //         ordersServiceStub.updateGift,
            //         ordersServiceStub.updateOrder
            //     )
            // ).toHaveBeenCalled();

            // expect(ordersServiceStub.updateGift).toHaveBeenCalled();
            // expect(ordersServiceStub.updateOrder).toHaveBeenCalled();
            // expect(mDBModalRefStub.hide).toHaveBeenCalled();
            // expect(alertServiceStub.success).toHaveBeenCalled();
        });
    });
});
