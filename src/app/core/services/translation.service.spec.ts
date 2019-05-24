import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service';
import { TranslationService } from './translation.service';
describe('TranslationService', () => {
  let service: TranslationService;
  beforeEach(() => {
    const httpClientStub = { get: url1 => ({ pipe: () => ({}) }) };
    const helperServiceStub = {
      getBrowserLanguage: () => ({ indexOf: () => ({}), substring: () => ({}) })
    };
    TestBed.configureTestingModule({
      providers: [
        TranslationService,
        { provide: HttpClient, useValue: httpClientStub },
        { provide: HelperService, useValue: helperServiceStub }
      ]
    });
    service = TestBed.get(TranslationService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('getLocale', () => {
    it('makes expected calls', () => {
      const helperServiceStub: HelperService = TestBed.get(HelperService);
      spyOn(helperServiceStub, 'getBrowserLanguage').and.callThrough();
      service.getLocale();
      expect(helperServiceStub.getBrowserLanguage).toHaveBeenCalled();
    });
  });
});
