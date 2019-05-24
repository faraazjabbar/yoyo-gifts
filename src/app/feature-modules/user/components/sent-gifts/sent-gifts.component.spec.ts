import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SentGiftsComponent } from './sent-gifts.component';
describe('SentGiftsComponent', () => {
  let component: SentGiftsComponent;
  let fixture: ComponentFixture<SentGiftsComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SentGiftsComponent]
    });
    fixture = TestBed.createComponent(SentGiftsComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('noData defaults to: false', () => {
    expect(component.noData).toEqual(false);
  });
});
