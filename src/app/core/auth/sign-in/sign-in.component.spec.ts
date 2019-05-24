import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../../../shared/models/user.model';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AlertService } from './../../services/alert.service';
import { SignInComponent } from './sign-in.component';
describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  beforeEach(() => {
    const authServiceStub = {
      googleSignInWithPopup: () => ({ then: () => ({ catch: () => ({}) }) }),
      signInWithEmail: (arg1, arg2) => ({
        then: () => ({ catch: () => ({}) })
      }),
      createUserWithEmail: (arg1, arg2) => ({
        then: () => ({ catch: () => ({}) })
      }),
      addNewUser: user1 => ({ subscribe: () => ({}) }),
      getUser: email1 => ({ subscribe: () => ({}) }),
      emitUserData: { next: () => ({}) }
    };
    const userStub = { isAdmin: {} };
    const routerStub = { navigate: array1 => ({}) };
    const formBuilderStub = { group: object1 => ({}) };
    const alertServiceStub = { error: err1 => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SignInComponent],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: FormBuilder, useValue: formBuilderStub },
        { provide: AlertService, useValue: alertServiceStub }
      ]
    });
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('isRegistered defaults to: false', () => {
    expect(component.isRegistered).toEqual(false);
  });
  describe('signInWithGoogle', () => {
    it('makes expected calls', () => {
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      const alertServiceStub: AlertService = fixture.debugElement.injector.get(
        AlertService
      );
      spyOn(authServiceStub, 'googleSignInWithPopup').and.callThrough();
      spyOn(alertServiceStub, 'error').and.callThrough();
      component.signInWithGoogle();
      expect(authServiceStub.googleSignInWithPopup).toHaveBeenCalled();
      expect(alertServiceStub.error).toHaveBeenCalled();
    });
  });
});
