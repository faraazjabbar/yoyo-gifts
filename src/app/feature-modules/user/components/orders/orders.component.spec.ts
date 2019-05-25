import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { OrdersComponent } from './orders.component';
import { of } from 'rxjs';
describe('OrdersComponent', () => {
    let component: OrdersComponent;
    let fixture: ComponentFixture<OrdersComponent>;
    beforeEach(() => {
        const ordersServiceStub = {
            getOrders: arg1 => ({ subscribe: () => ({}) }),
            updateOrder: arg1 => ({ subscribe: () => ({}) }),
            updateGift: arg1 => ({})
        };
        const authServiceStub = {
            emitUserData: {
                getValue: () => ({
                    key: 'a',
                    email: 'teja.pvt@gmail.com',
                    imageLink: 'a',
                    isAdmin: true,
                    points: 10000,
                    userId: 'a',
                    userName: 'a'
                })
            }
        };
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

    it('noData should be false if user is null', () => {
        component.user = null;
        fixture.detectChanges();
        expect(component.noData).toBeFalsy();
    });

    it('should set the user from auth service', () => {
        // const authServiceStub: AuthService = fixture.debugElement.injector.get(
        //     AuthService
        // );

        // spyOn(authServiceStub, 'emitUserData').and.returnValue(
        //     of({
        //         key: 'a',
        //         email: 'teja.pvt@gmail.com',
        //         imageLink: 'a',
        //         isAdmin: true,
        //         points: 10000,
        //         userId: 'a',
        //         userName: 'a'
        //     })
        // );

        fixture.detectChanges();
        // expect(authServiceStub.emitUserData).toHaveBeenCalled();
        expect(component.user).toEqual({
            key: 'a',
            email: 'teja.pvt@gmail.com',
            imageLink: 'a',
            isAdmin: true,
            points: 10000,
            userId: 'a',
            userName: 'a'
        });
    });

    describe('tabChange', () => {
        it('selectedTab should be false', () => {
            component.tabClick(true);
            expect(component.selectedTab).toEqual(false);
        });
    });

    describe('getOrders', () => {
        it('should get orders', () => {
            const ordersServiceStub: OrdersService = fixture.debugElement.injector.get(
                OrdersService
            );

            spyOn(ordersServiceStub, 'getOrders').and.returnValue(
                of({
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
                            isRedeemed: true,
                            isReviewed: true,
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
                })
            );
            component.user = {
                key: 'a',
                email: 'teja.pvt@gmail.com',
                imageLink: 'a',
                isAdmin: true,
                points: 10000,
                userId: 'a',
                userName: 'a'
            };

            component.getOrders();

            expect(ordersServiceStub.getOrders).toHaveBeenCalled();
            expect(component.orders).toEqual({
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
                        isRedeemed: true,
                        isReviewed: true,
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
            });
        });
    });
});
