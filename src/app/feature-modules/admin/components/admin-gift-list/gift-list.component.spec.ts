import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGiftListComponent } from './gift-list.component';

describe('AdminGiftListComponent', () => {
  let component: AdminGiftListComponent;
  let fixture: ComponentFixture<AdminGiftListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGiftListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGiftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
