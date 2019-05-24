import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GiftService } from './../../feature-modules/gift/services/gift.service';
import { HomeComponent } from './home.component';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  beforeEach(() => {
    const giftServiceStub = {
      getGiftsByQuery: () => ({}),
      getGiftsByQuery2: () => ({})
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeComponent],
      providers: [{ provide: GiftService, useValue: giftServiceStub }]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const giftServiceStub: GiftService = fixture.debugElement.injector.get(
        GiftService
      );
      spyOn(giftServiceStub, 'getGiftsByQuery').and.callThrough();
      spyOn(giftServiceStub, 'getGiftsByQuery2').and.callThrough();
      component.ngOnInit();
      expect(giftServiceStub.getGiftsByQuery).toHaveBeenCalled();
      expect(giftServiceStub.getGiftsByQuery2).toHaveBeenCalled();
    });
  });
});
