import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { AlertService } from './../../../../core/services/alert.service';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../../../core/auth/auth.service';
import { AddPointsComponent } from './add-points.component';
import { of, throwError } from 'rxjs';
import { OrdersService } from '../../services/orders.service';
describe('AddPointsComponent', () => {
    let component: AddPointsComponent;
    let fixture: ComponentFixture<AddPointsComponent>;
    beforeEach(() => {
        const mDBModalRefStub = { hide: () => ({}) };
        const alertServiceStub = {
            success: (string1, string2) => ({}),
            error: err1 => ({})
        };
        const userServiceStub = {
            updateUser: user1 => ({ subscribe: () => of({ status: true }) })
        };
        const authServiceStub = { emitUserData: { next: () => ({}) } };
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [AddPointsComponent],
            providers: [
                { provide: MDBModalRef, useValue: mDBModalRefStub },
                { provide: AlertService, useValue: alertServiceStub },
                { provide: UserService, useValue: userServiceStub },
                { provide: AuthService, useValue: authServiceStub }
            ]
        });
        fixture = TestBed.createComponent(AddPointsComponent);
        component = fixture.componentInstance;
    });
    it('can load instance', () => {
        expect(component).toBeTruthy();
    });

    describe('setPoints', () => {
        it('should set points', () => {
            component.content = {
                key: 'a',
                email: 'a',
                imageLink: 'a',
                isAdmin: true,
                points: 10000,
                userId: 'a',
                userName: 'a'
            };
            component.points = 5;
            const userServiceStub: UserService = fixture.debugElement.injector.get(
                UserService
            );

            const alertServiceStub: AlertService = fixture.debugElement.injector.get(
                AlertService
            );

            const mDBModalRefStub: MDBModalRef = fixture.debugElement.injector.get(
                MDBModalRef
            );
            spyOn(userServiceStub, 'updateUser').and.returnValue(
                of({ status: true })
            );
            spyOn(alertServiceStub, 'success').and.callThrough();
            spyOn(mDBModalRefStub, 'hide').and.callThrough();

            component.setPoints();
            expect(userServiceStub.updateUser).toHaveBeenCalled();
            expect(alertServiceStub.success).toHaveBeenCalled();
            expect(mDBModalRefStub.hide).toHaveBeenCalled();
            // expect(userServiceStub.updateUser).toThrowError();
        });
        it('should show error when failed', () => {
            component.content = {
                key: 'a',
                email: 'a',
                imageLink: 'a',
                isAdmin: true,
                points: 10000,
                userId: 'a',
                userName: 'a'
            };
            component.points = 5;
            const userServiceStub: UserService = fixture.debugElement.injector.get(
                UserService
            );

            const alertServiceStub: AlertService = fixture.debugElement.injector.get(
                AlertService
            );
            spyOn(userServiceStub, 'updateUser').and.returnValue(
                throwError('err')
            );
            spyOn(alertServiceStub, 'error').and.callThrough();

            component.setPoints();
            expect(userServiceStub.updateUser).toHaveBeenCalled();
            expect(alertServiceStub.error).toHaveBeenCalled();

            // expect(userServiceStub.updateUser).toThrowError();
        });
    });
});
