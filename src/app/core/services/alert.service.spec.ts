import { TestBed } from '@angular/core/testing';
import { SweetAlertResult } from 'sweetalert2';
import { TranslationService } from 'src/app/core/services/translation.service';
import { AlertService } from './alert.service';
describe('AlertService', () => {
  let service: AlertService;
  beforeEach(() => {
    const sweetAlertResultStub = { value: {} };
    const translationServiceStub = {};
    TestBed.configureTestingModule({
      providers: [
        AlertService,
        { provide: SweetAlertResult, useValue: sweetAlertResultStub },
        { provide: TranslationService, useValue: translationServiceStub }
      ]
    });
    service = TestBed.get(AlertService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
