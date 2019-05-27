import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RecievedGift, Order } from 'src/app/shared/models/orders.model';
import { OrdersService } from '../../services/orders.service';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { AlertService } from '../../../../core/services/alert.service';
import { RecievedGiftsComponent } from './recieved-gifts.component';
import { of, Subject } from 'rxjs';
import { ReviewGiftComponent } from '../review-gift/review-gift.component';

class DummyReviewGiftComponent {
    content: {
        action: null;
    };
}
describe('RecievedGiftsComponent', () => {
    let component: RecievedGiftsComponent;
    let fixture: ComponentFixture<RecievedGiftsComponent>;
    let order: Order;
    let recievedGifts: RecievedGift[];
    const modalRef: MDBModalRef;
    let modalService: MDBModalService;
    beforeEach(() => {
        const ordersServiceStub = {
            updateOrder: arg1 => ({ subscribe: () => of(order) }),
            getGiftByKey: arg1 => ({ pipe: () => ({ subscribe: () => ({}) }) }),
            updateGift: g1 => ({})
        };
        // const mDBModalServiceStub = {
        //     show: (reviewGiftComponent1, arg2) => ({})
        // };
        const alertServiceStub = {
            success: (string1, string2) => ({}),
            error: err1 => ({})
        };
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [RecievedGiftsComponent],
            providers: [
                { provide: OrdersService, useValue: ordersServiceStub },
                { provide: MDBModalService, useValue: modalService },
                { provide: AlertService, useValue: alertServiceStub }
            ]
        });
        fixture = TestBed.createComponent(RecievedGiftsComponent);
        component = fixture.componentInstance;
        order = {
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
        };

        recievedGifts = order.recieved;
    });

    it('can load instance', () => {
        expect(component).toBeTruthy();
    });
    it('noData defaults to: false', () => {
        expect(component.noData).toEqual(false);
    });

    it('noData should be true when no Orders are there', () => {
        component.orders = {
            email: 'teja.pvt@gmail.com',
            sent: [],
            recieved: []
        };
        component.ngOnChanges();

        fixture.detectChanges();
        expect(component.noData).toEqual(true);
    });

    it('noData should be false when orders have sent items', () => {
        component.orders = order;
        component.ngOnChanges();

        fixture.detectChanges();
        expect(component.noData).toEqual(false);
    });

    describe('formatDate', () => {
        it('should return formatted date', () => {
            const formattedDate = component.formatDate(new Date());
            expect(formattedDate).toBe(new Date().toLocaleDateString());
        });
    });

    describe('redeem', () => {
        it('makes expected calls', () => {
            component.orders = order;
            component.ngOnChanges();
            fixture.detectChanges();
            const ordersServiceStub: OrdersService = fixture.debugElement.injector.get(
                OrdersService
            );
            const alertServiceStub: AlertService = fixture.debugElement.injector.get(
                AlertService
            );
            spyOn(ordersServiceStub, 'updateOrder').and.callThrough();
            spyOn(alertServiceStub, 'success').and.callThrough();
            spyOn(alertServiceStub, 'error').and.callThrough();
            component.redeem(recievedGifts[0]);
            expect(ordersServiceStub.updateOrder).toHaveBeenCalled();
            // expect(alertServiceStub.success).toHaveBeenCalled();
            // expect(alertServiceStub.error).toHaveBeenCalled();
        });
    });
    describe('review', () => {
        it('makes expected calls', () => {
            // const ordersServiceStub: OrdersService = fixture.debugElement.injector.get(
            //     OrdersService
            // );
            modalService = fixture.debugElement.injector.get(MDBModalService);
            spyOn(modalService, 'show').and.returnValue(modalRef);

            component.modalRef = modalService.show(ReviewGiftComponent);

            component.orders = {
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
            };

            // component.modalRef.content.action = new Subject();
            // component.modalRef.content.action.next({
            //     reviewedOn: 'Wed May 22 2019',
            //     userId: '-LfVhSZnboy1TJyhz8ym',
            //     userImage:
            //         'https://lh4.googleusercontent.cYKysW1mMw6uXDzc1tcQ/mo/photo.jpg',
            //     userName: 'eric cartman',
            //     userRating: 2,
            //     userReview: 'nice trip'
            // });
            // const alertServiceStub: AlertService = fixture.debugElement.injector.get(
            //     AlertService
            // );
            // spyOn(ordersServiceStub, 'getGiftByKey').and.callThrough();
            // spyOn(ordersServiceStub, 'updateGift').and.callThrough();
            // spyOn(ordersServiceStub, 'updateOrder').and.callThrough();
            spyOn(modalService, 'show').and.returnValue(modalRef);
            // spyOn(alertServiceStub, 'success').and.callThrough();
            // spyOn(alertServiceStub, 'error').and.callThrough();
            component.review(recievedGifts[0]);
            // expect(ordersServiceStub.getGiftByKey).toHaveBeenCalled();
            // expect(ordersServiceStub.updateGift).toHaveBeenCalled();
            // expect(ordersServiceStub.updateOrder).toHaveBeenCalled();
            expect(modalService.show).toHaveBeenCalled();
            // expect(alertServiceStub.success).toHaveBeenCalled();
            // expect(alertServiceStub.error).toHaveBeenCalled();
        });
    });
});
