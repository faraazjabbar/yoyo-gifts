import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from './../../../shared/services/firebase.service';
import { GiftService } from './gift.service';
describe('GiftService', () => {
  let service: GiftService;
  beforeEach(() => {
    const httpClientStub = {};
    const firebaseServiceStub = {
      getByQuery: string1 => ({}),
      getByQuery2: string1 => ({}),
      get: string1 => ({}),
      getByKey: (string1, key2) => ({})
    };
    TestBed.configureTestingModule({
      providers: [
        GiftService,
        { provide: HttpClient, useValue: httpClientStub },
        { provide: FirebaseService, useValue: firebaseServiceStub }
      ]
    });
    service = TestBed.get(GiftService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('getGiftsByQuery', () => {
    it('makes expected calls', () => {
      const firebaseServiceStub: FirebaseService = TestBed.get(FirebaseService);
      spyOn(firebaseServiceStub, 'getByQuery').and.callThrough();
      service.getGiftsByQuery();
      expect(firebaseServiceStub.getByQuery).toHaveBeenCalled();
    });
  });
  describe('getGiftsByQuery2', () => {
    it('makes expected calls', () => {
      const firebaseServiceStub: FirebaseService = TestBed.get(FirebaseService);
      spyOn(firebaseServiceStub, 'getByQuery2').and.callThrough();
      service.getGiftsByQuery2();
      expect(firebaseServiceStub.getByQuery2).toHaveBeenCalled();
    });
  });
  describe('getGifts', () => {
    it('makes expected calls', () => {
      const firebaseServiceStub: FirebaseService = TestBed.get(FirebaseService);
      spyOn(firebaseServiceStub, 'get').and.callThrough();
      service.getGifts();
      expect(firebaseServiceStub.get).toHaveBeenCalled();
    });
  });
});
