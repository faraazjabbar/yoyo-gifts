import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminUserListComponent } from './user-list.component';
describe('UserListComponent', () => {
  let component: AdminUserListComponent;
  let fixture: ComponentFixture<AdminUserListComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AdminUserListComponent]
    });
    fixture = TestBed.createComponent(AdminUserListComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
