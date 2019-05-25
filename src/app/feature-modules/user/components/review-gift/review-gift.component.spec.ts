import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { ReviewGiftComponent } from './review-gift.component';
import { AuthService } from 'src/app/core/auth/auth.service';
import { of } from 'rxjs';
describe('ReviewGiftComponent', () => {
    let component: ReviewGiftComponent;
    let fixture: ComponentFixture<ReviewGiftComponent>;
    beforeEach(() => {
        const mDBModalRefStub = {};
        const authServiceStub = {
            googleSignInWithPopup: () => ({
                then: () => ({ catch: () => ({}) })
            }),
            signInWithEmail: (arg1, arg2) => ({
                then: () => ({ catch: () => ({}) })
            }),
            createUserWithEmail: (arg1, arg2) => ({
                then: () => ({ catch: () => ({}) })
            }),
            addNewUser: user1 => ({ subscribe: () => ({}) }),
            getUser: email1 => ({ subscribe: () => ({}) }),
            emitUserData: {
                next: () => ({}),
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
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [ReviewGiftComponent],
            providers: [
                { provide: MDBModalRef, useValue: mDBModalRefStub },
                { provide: AuthService, useValue: authServiceStub }
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

    describe('getRating', () => {
        it('should set the rating', () => {
            component.getRating(5);
            expect(component.rating).toBe(5);
        });
    });

    describe('sendReview', () => {
        it('should emit the review', () => {
            component.action.subscribe(d => {
                expect(d).toEqual({
                    userId: 'a',
                    userName: 'a',
                    userImage: 'a',
                    userReview: 'a',
                    userRating: 0,
                    reviewedOn: new Date().toDateString()
                });
            });
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

            component.sendReview();
        });
    });
});
