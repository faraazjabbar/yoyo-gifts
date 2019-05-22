import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentGiftsComponent } from './sent-gifts.component';

describe('SentGiftsComponent', () => {
  let component: SentGiftsComponent;
  let fixture: ComponentFixture<SentGiftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentGiftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentGiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
