import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminGiftService } from './../../services/admin-gift.service';
import { MDBModalRef } from 'angular-bootstrap-md';
import { ConfirmationModalComponent } from './confirmation-modal.component';
describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;
  beforeEach(() => {
    const adminGiftServiceStub = { deleteGift: arg1 => ({}) };
    const mDBModalRefStub = {};
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ConfirmationModalComponent],
      providers: [
        { provide: AdminGiftService, useValue: adminGiftServiceStub },
        { provide: MDBModalRef, useValue: mDBModalRefStub }
      ]
    });
    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const adminGiftServiceStub: AdminGiftService = fixture.debugElement.injector.get(
        AdminGiftService
      );
      spyOn(adminGiftServiceStub, 'deleteGift').and.callThrough();
      component.ngOnInit();
      expect(adminGiftServiceStub.deleteGift).toHaveBeenCalled();
    });
  });
});
