import { TestBed } from '@angular/core/testing';
import { HelperService } from './helper.service';
describe('HelperService', () => {
  let service: HelperService;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [HelperService] });
    service = TestBed.get(HelperService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
