import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewGiftComponent } from './review-gift.component';

describe('ReviewGiftComponent', () => {
  let component: ReviewGiftComponent;
  let fixture: ComponentFixture<ReviewGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewGiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
