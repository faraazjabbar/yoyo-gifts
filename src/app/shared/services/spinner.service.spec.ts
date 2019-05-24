import { TestBed } from '@angular/core/testing';
import { SpinnerService } from './spinner.service';
describe('SpinnerService', () => {
  let service: SpinnerService;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SpinnerService] });
    service = TestBed.get(SpinnerService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
