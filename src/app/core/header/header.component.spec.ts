import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    beforeEach(() => {
        const changeDetectorRefStub = { detectChanges: () => ({}) };
        const routerStub = { navigate: array1 => ({}) };
        const authServiceStub = {
            emitUserData: { subscribe: () => ({}), next: () => ({}) },
            signOut: () => ({ then: () => ({}) })
        };
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [HeaderComponent],
            providers: [
                { provide: ChangeDetectorRef, useValue: changeDetectorRefStub },
                { provide: Router, useValue: routerStub },
                { provide: AuthService, useValue: authServiceStub }
            ]
        });
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
    });
    it('can load instance', () => {
        expect(component).toBeTruthy();
    });
    it('isLoggedIn defaults to: false', () => {
        expect(component.isLoggedIn).toEqual(false);
    });
    describe('gotoSignIn', () => {
        it('makes expected calls', () => {
            const routerStub: Router = fixture.debugElement.injector.get(Router);
            spyOn(routerStub, 'navigate').and.callThrough();
            component.gotoSignIn();
            expect(routerStub.navigate).toHaveBeenCalled();
        });
    });
    describe('logOut', () => {
        it('makes expected calls', () => {
            const routerStub: Router = fixture.debugElement.injector.get(Router);
            const authServiceStub: AuthService = fixture.debugElement.injector.get(
                AuthService
            );
            spyOn(routerStub, 'navigate').and.callThrough();
            spyOn(authServiceStub, 'signOut').and.callThrough();
            component.logOut();
            expect(routerStub.navigate).toHaveBeenCalled();
            expect(authServiceStub.signOut).toHaveBeenCalled();
        });
    });
});
