import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBModalService } from 'angular-bootstrap-md';
import { Store } from '@ngrx/store';
import { GiftListComponent } from './gift-list.component';

describe('GiftListComponent', () => {
    let component: GiftListComponent;
    let fixture: ComponentFixture<GiftListComponent>;
    beforeEach(() => {
        const mDBModalServiceStub = { show: (manageGiftComponent1, arg2) => ({}) };
        const storeStub = {
            select: arg1 => ({ pipe: () => ({ subscribe: () => ({}) }) }),
            dispatch: arg1 => ({})
        };
        const giftsStub = {};
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [GiftListComponent],
            providers: [
                { provide: MDBModalService, useValue: mDBModalServiceStub },
                { provide: Store, useValue: storeStub }
            ]
        });
        fixture = TestBed.createComponent(GiftListComponent);
        component = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(component).toBeTruthy();
    });

    it('isAdmin defaults to: false', () => {
        expect(component.isAdmin).toEqual(false);
    });

    // describe('onEdit', () => {
    //     it('makes expected calls', () => {
    //         const mDBModalServiceStub: MDBModalService = fixture.debugElement.injector.get(MDBModalService);
    //         spyOn(mDBModalServiceStub, 'show').and.callThrough();
    //         component.onEdit(giftsStub);
    //         expect(mDBModalServiceStub.show).toHaveBeenCalled();
    //     });
    // });

    // describe('onDelete', () => {
    //     it('makes expected calls', () => {
    //         const mDBModalServiceStub: MDBModalService = fixture.debugElement.injector.get(MDBModalService);
    //         const giftStub: Gift = fixture.debugElement.injector.get(Gift);
    //         spyOn(mDBModalServiceStub, 'show').and.callThrough();
    //         component.onDelete(giftStub);
    //         expect(mDBModalServiceStub.show).toHaveBeenCalled();
    //     });
    // });

    // describe('ngOnInit', () => {
    //     it('makes expected calls', () => {
    //         const storeStub: Store = fixture.debugElement.injector.get(Store);
    //         spyOn(storeStub, 'select').and.callThrough();
    //         spyOn(storeStub, 'dispatch').and.callThrough();
    //         component.ngOnInit();
    //         expect(storeStub.select).toHaveBeenCalled();
    //         expect(storeStub.dispatch).toHaveBeenCalled();
    //     });
    // });

});
