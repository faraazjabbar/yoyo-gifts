import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftFilterComponent } from './gift-filter.component';

describe('GiftFilterComponent', () => {
  let component: GiftFilterComponent;
  let fixture: ComponentFixture<GiftFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
