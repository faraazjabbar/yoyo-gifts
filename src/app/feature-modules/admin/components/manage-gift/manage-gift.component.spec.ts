import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminGiftService } from './../../services/admin-gift.service';
import { FormBuilder } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { ManageGiftComponent } from './manage-gift.component';
describe('ManageGiftComponent', () => {
  let component: ManageGiftComponent;
  let fixture: ComponentFixture<ManageGiftComponent>;
  beforeEach(() => {
    const adminGiftServiceStub = {
      categories: { length: {} },
      getCategories: () => ({ subscribe: () => ({}) }),
      brands: { length: {} },
      getBrands: () => ({ subscribe: () => ({}) }),
      updateGift: object1 => ({}),
      addGift: addGiftObj1 => ({})
    };
    const formBuilderStub = { group: object1 => ({}) };
    const abstractControlStub = { value: {} };
    const mDBModalRefStub = {};
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ManageGiftComponent],
      providers: [
        { provide: AdminGiftService, useValue: adminGiftServiceStub },
        { provide: FormBuilder, useValue: formBuilderStub },
        { provide: AbstractControl, useValue: abstractControlStub },
        { provide: MDBModalRef, useValue: mDBModalRefStub }
      ]
    });
    fixture = TestBed.createComponent(ManageGiftComponent);
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
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(adminGiftServiceStub, 'getCategories').and.callThrough();
      spyOn(adminGiftServiceStub, 'getBrands').and.callThrough();
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.ngOnInit();
      expect(adminGiftServiceStub.getCategories).toHaveBeenCalled();
      expect(adminGiftServiceStub.getBrands).toHaveBeenCalled();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });
  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const adminGiftServiceStub: AdminGiftService = fixture.debugElement.injector.get(
        AdminGiftService
      );
      spyOn(adminGiftServiceStub, 'updateGift').and.callThrough();
      spyOn(adminGiftServiceStub, 'addGift').and.callThrough();
      component.onSubmit();
      expect(adminGiftServiceStub.updateGift).toHaveBeenCalled();
      expect(adminGiftServiceStub.addGift).toHaveBeenCalled();
    });
  });
});
