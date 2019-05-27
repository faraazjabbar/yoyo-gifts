import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminUserListComponent } from './user-list.component';
<<<<<<< HEAD

describe('AdminUserListComponent', () => {
=======
describe('UserListComponent', () => {
>>>>>>> 905c393295be6ccac5d9085fb2c1a6b54b194ed4
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
