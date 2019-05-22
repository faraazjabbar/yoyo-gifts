import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievedGiftsComponent } from './recieved-gifts.component';

describe('RecievedGiftsComponent', () => {
  let component: RecievedGiftsComponent;
  let fixture: ComponentFixture<RecievedGiftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecievedGiftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievedGiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
