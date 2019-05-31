import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, Pipe, PipeTransform, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { ActivatedRoute, Router, Route, ExtraOptions, NavigationStart, NavigationEnd } from '@angular/router';
import { OrdersService } from 'src/app/feature-modules/user/services/orders.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { TranslationService } from 'src/app/core/services/translation.service';
import { GiftDetailsComponent } from './gift-details.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/feature-modules/user/services/user.service';
import { Gift } from 'src/app/shared/models/gift.model';

class MockRouter {
    public ne = new NavigationEnd(0, 'http://localhost:4200/login', 'http://localhost:4200/login');
    public events = new Observable(observer => {
        observer.next(this.ne);
        observer.complete();
    });
}

class MockRouterNoLogin {
    public ne = new NavigationEnd(0, 'http://localhost:4200/dashboard', 'http://localhost:4200/dashboard');
    public events = new Observable(observer => {
        observer.next(this.ne);
        observer.complete();
    });
}

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
    let routerStub, activatedRouteStub, authServiceTub, userServiceStub, ordersServiceStub;
    let router: Router;

    beforeEach(() => {
        // routerStub = jasmine.createSpyObj('events', ['routerEvent']);
        // activatedRouteStub = jasmine.createSpyObj('data', ['data']);
        routerStub = {
            events: of(new NavigationEnd(0, 'http://localhost:4200', 'http://localhost:4200'))
        };
        activatedRouteStub = {
            data: of({
                gift : <Gift>{
                    key: 'string',
                    giftName: 'string',
                    brandId: 'string',
                    brandName: 'string',
                    categoryId: 'string',
                    categoryName: 'string',
                    imageLink: 'string',
                    cost: 0,
                    discount: 0,
                    count: 0,
                    description: 'string',
                    rating: 0,
                    giftedCount: 0,
                    reviews: [{
                        userId: 'string',
                        userName: 'string',
                        userImage: 'string',
                        userRating: 0,
                        userReview: 'string',
                        reviewedOn: 'string'
                    },{
                        userId: 'string',
                        userName: 'string',
                        userImage: 'string',
                        userRating: 0,
                        userReview: 'string',
                        reviewedOn: 'string'
                    }]
                }
            })
        };
        authServiceTub = {
            emitUserData: of(<User>{
                key: '-userabcdefghijklmnopqrstuvwxyz',
                userId: 'firstuserid',
                userName: 'Samir',
                email: 'adaksamir@gmail.com',
                isAdmin: false,
                imageLink: '',
                points: 10,
                favoriteGifts:
                [{
                    key: '-giftabcdefghijklmnopqrstuvwxyz',
                    giftName: 'Amazon Gift Bonus',
                    brandId: '-brandabcdefghijklmnopqrstuvwxyz',
                    brandName: 'Amazon',
                    categoryId: 'catabcdefghijklmnopqrstuvwxyz',
                    categoryName: 'Ecommerce',
                    imageLink: '',
                    cost: 1000,
                    discount: 10,
                    count: 10,
                    description: 'string',
                    rating: 4,
                    giftedCount: 5,
                    reviews: [{
                        userId: '-user1abcdefghijklmnopqrstuvwxyz',
                        userName: 'Samir1',
                        userImage: '',
                        userRating: 3,
                        userReview: 'review1',
                        reviewedOn: ''
                    },{
                        userId: 'user2abcdefghijklmnopqrstuvwxyz',
                        userName: 'Samir2',
                        userImage: '',
                        userRating: 4,
                        userReview: 'review2',
                        reviewedOn: ''
                    }]
                },{
                    key: 'string',
                    giftName: 'string',
                    brandId: 'string',
                    brandName: 'string',
                    categoryId: 'string',
                    categoryName: 'string',
                    imageLink: 'string',
                    cost: 0,
                    discount: 0,
                    count: 0,
                    description: 'string',
                    rating: 0,
                    giftedCount: 0,
                    reviews: [{
                        userId: 'string',
                        userName: 'string',
                        userImage: 'string',
                        userRating: 0,
                        userReview: 'string',
                        reviewedOn: 'string'
                    },{
                        userId: 'string',
                        userName: 'string',
                        userImage: 'string',
                        userRating: 0,
                        userReview: 'string',
                        reviewedOn: 'string'
                    }]
                }]
            })
        };

        ordersServiceStub = jasmine.createSpyObj(['getOrders', 'updateOrder', 'addNewOrder', 'updateGift']);

        userServiceStub = jasmine.createSpyObj(['getUsers', 'getUserByKey', 'updateUser']);

        TestBed.configureTestingModule({
            declarations: [GiftDetailsComponent, MockTranslatePipe],
            imports: [
                HttpClientTestingModule,
                FormsModule
            ],
            providers: [
                { provide: Router, useValue: routerStub},
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: AuthService, useValue: authServiceTub },
                { provide: UserService, useValue: userServiceStub },
                { provide: OrdersService, useValue: ordersServiceStub },
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        });
        fixture = TestBed.createComponent(GiftDetailsComponent);
        component = fixture.componentInstance;
        router = fixture.debugElement.injector.get( Router);
        fixture.detectChanges();
    });

    it('should load instance', () => {
        expect(component).toBeTruthy();
    });

    it('should make expected router actiated data', () => {
        component.ngOnInit();
        expect(activatedRouteStub.data).toBeDefined();
    });

    describe('onSubmit', () => {
        it('makes expected add update order', () => {
            const orderServiceStub: OrdersService = fixture.debugElement.injector.get(OrdersService);
            // spyOn(orderServiceStub, 'getOrders').and.callThrough();
            // spyOn(orderServiceStub, 'addNewOrder').and.callThrough();
            // spyOn(orderServiceStub, 'updateOrder').and.callThrough();
            component.onSubmit();
            expect(orderServiceStub.addNewOrder).toHaveBeenCalled();
            expect(orderServiceStub.updateOrder).toHaveBeenCalled();
        });
    });
});
