import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBModalService } from 'angular-bootstrap-md';
import { AuthService } from './../../../../core/auth/auth.service';
import { ProfileComponent } from './profile.component';
import { of } from 'rxjs';

describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;
    beforeEach(() => {
        const mDBModalServiceStub = {
            show: (addPointsComponent1, arg2) => ({})
        };
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
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [ProfileComponent],
            providers: [
                { provide: MDBModalService, useValue: mDBModalServiceStub },
                { provide: AuthService, useValue: authServiceStub }
            ]
        });
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
    });
    it('can load instance', () => {
        expect(component).toBeTruthy();
    });

    it('should set the user data', () => {
        fixture.detectChanges();
        expect(component.user).toEqual({
            key: 'a',
            email: 'a',
            imageLink: 'a',
            isAdmin: true,
            points: 10000,
            userId: 'a',
            userName: 'a'
        });
    });

    describe('addPoints', () => {
        it('should add points', () => {
            component.user = {
                key: 'a',
                email: 'a',
                imageLink: 'a',
                isAdmin: true,
                points: 10000,
                userId: 'a',
                userName: 'a'
            };

            const mDBModalServiceStub: MDBModalService = fixture.debugElement.injector.get(
                MDBModalService
            );
            spyOn(mDBModalServiceStub, 'show').and.callThrough();
            component.addPoints();
            expect(mDBModalServiceStub.show).toHaveBeenCalled();
        });
    });
});
