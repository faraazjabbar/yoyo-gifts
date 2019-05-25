import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/shared/models/orders.model';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { Gift } from 'src/app/shared/models/gift.model';
import { OrdersService } from './orders.service';
describe('OrdersService', () => {
    let service: OrdersService;
    beforeEach(() => {
        const httpClientStub = { get: arg1 => ({ pipe: () => ({}) }) };
        const orderStub = {};
        const firebaseServiceStub = {
            update: (string1, order2) => ({}),
            add: (string1, order2) => ({}),
            getByKey: (string1, key2) => ({})
        };
        const giftStub = {};
        TestBed.configureTestingModule({
            providers: [
                OrdersService,
                { provide: HttpClient, useValue: httpClientStub },
                { provide: FirebaseService, useValue: firebaseServiceStub }
            ]
        });
        service = TestBed.get(OrdersService);
    });
    it('can load instance', () => {
        expect(service).toBeTruthy();
    });
    describe('updateOrder', () => {
        it('makes expected calls', () => {
            const order: Order = {
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
            const firebaseServiceStub: FirebaseService = TestBed.get(
                FirebaseService
            );
            spyOn(firebaseServiceStub, 'update').and.callThrough();
            service.updateOrder(order);
            expect(firebaseServiceStub.update).toHaveBeenCalled();
        });
    });
    describe('addNewOrder', () => {
        it('makes expected calls', () => {
            const order: Order = {
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
            const firebaseServiceStub: FirebaseService = TestBed.get(
                FirebaseService
            );
            spyOn(firebaseServiceStub, 'add').and.callThrough();
            service.addNewOrder(order);
            expect(firebaseServiceStub.add).toHaveBeenCalled();
        });
    });
    describe('updateGift', () => {
        const gift: Gift = {
            brandId: '-LfIfe7E9kmqaujw9T69',
            brandName: 'VLCC',
            categoryId: '-LfIaO0KeifcUoVt70qJ',
            categoryName: 'Health and beauty',
            cost: 123,
            count: 129,
            description: 'adfasd',
            discount: 12,
            giftName: 'dsfasdf',
            imageLink:
                'https://ccatalogue/vlcc-healthcare-ltd-bhagalpur-ho-bhagalpur-dermatologists-isyshs.jpg',
            rating: 4,
            reviews: [
                {
                    reviewedOn: 'Fri May 24 2019',
                    userId: '-LfNoKZ3RZbh2TTEA2qS',
                    userImage:
                        'https://lh3.googleusercontent.com/-BhICkiG7BX4/AAAAAAAAAAI/AAAAAAABGi0/ibu39HZZdo0/photo.jpg',
                    userName: 'Faraaz Jabbar',
                    userRating: 4,
                    userReview: 'Nice'
                }
            ]
        };

        it('makes expected calls', () => {
            const firebaseServiceStub: FirebaseService = TestBed.get(
                FirebaseService
            );
            spyOn(firebaseServiceStub, 'update').and.callThrough();
            service.updateGift(gift);
            expect(firebaseServiceStub.update).toHaveBeenCalled();
        });
    });
});
