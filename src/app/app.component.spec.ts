import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    beforeEach(() => {
        const storeStub = {};
        const routerStub = {};
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [AppComponent],
            providers: [
                { provide: Store, useValue: storeStub },
                { provide: Router, useValue: routerStub }
            ]
        });
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });
    it('can load instance', () => {
        expect(component).toBeTruthy();
    });
    it('title defaults to: yoyo-gifts', () => {
        expect(component.title).toEqual('yoyo-gifts');
    });
});
