import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { ReviewGiftComponent } from './review-gift.component';
describe('ReviewGiftComponent', () => {
  let component: ReviewGiftComponent;
  let fixture: ComponentFixture<ReviewGiftComponent>;
  beforeEach(() => {
    const mDBModalRefStub = {};
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ReviewGiftComponent],
      providers: [{ provide: MDBModalRef, useValue: mDBModalRefStub }]
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
});
