import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { SpinnerComponent } from './spinner.component';
describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  beforeEach(() => {
    const spinnerServiceStub = { loaderState: { subscribe: () => ({}) } };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SpinnerComponent],
      providers: [{ provide: SpinnerService, useValue: spinnerServiceStub }]
    });
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('content defaults to: Loading...', () => {
    expect(component.content).toEqual('Loading...');
  });
  it('show defaults to: false', () => {
    expect(component.show).toEqual(false);
  });
});
