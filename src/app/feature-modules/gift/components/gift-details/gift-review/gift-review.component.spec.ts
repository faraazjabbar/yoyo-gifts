import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftReviewComponent } from './gift-review.component';

describe('GiftReviewComponent', () => {
  let component: GiftReviewComponent;
  let fixture: ComponentFixture<GiftReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
