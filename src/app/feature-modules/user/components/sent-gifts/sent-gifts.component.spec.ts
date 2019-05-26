import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SentGiftsComponent } from './sent-gifts.component';

describe('SentGiftsComponent', () => {
  let component: SentGiftsComponent;
  let fixture: ComponentFixture<SentGiftsComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SentGiftsComponent]
    });
    fixture = TestBed.createComponent(SentGiftsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('noData defaults to: false', () => {
    expect(component.noData).toEqual(false);
  });

  it('noData should be true when no Orders are there', () => {
    component.orders = { email: 'teja.pvt@gmail.com', sent: [], recieved: [] };
    component.ngOnChanges();

    fixture.detectChanges();
    expect(component.noData).toEqual(true);
  });

  it('noData should be false when orders have sent items', () => {
    component.orders = {
      email: 'teja.pvt@gmail.com',
      recieved: [
        {
          brandId: '-LfIdeIyqlhjpbpw_YPl',
          brandName: 'Amazon',
          categoryId: '-LfIa4GVaSL9wz4xas9c',
          categoryName: 'Ecommerce',
          cost: 2000,
          count: 10,
          description: 'Amazon gift voucher worth 2000 rs.',
          discount: 10,
          giftName: 'Amazon gift voucher',
          imageLink:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp3GHlaw4lNLDai56mArBP8h2Q9t27Z6iJCh6sWhBzPqEcg0Ey',
          isRedeemed: true,
          isReviewed: true,
          key: '-LfJ5QOowN3YbPRFRkSL',
          rating: 4,
          recievedOn: '2019-05-21T06:29:32.742Z',
          senderEmail: 'faraaz.jabbar@gmail.com',
          senderName: 'Faraaz jabbar'
        }
      ],
      sent: [
        {
          brandId: '-LfIdeIyqlhjpbpw_YPl',
          brandName: 'Amazon',
          categoryId: '-LfIa4GVaSL9wz4xas9c',
          categoryName: 'Ecommerce',
          cost: 2000,
          count: 10,
          description: 'Amazon gift voucher worth 2000 rs.',
          discount: 10,
          giftName: 'Amazon gift voucher',
          imageLink:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp3GHlaw4lNLDai56mArBP8h2Q9t27Z6iJCh6sWhBzPqEcg0Ey',
          rating: 4,
          recieverName: 'Faraaz jabbar',
          revieverEmail: 'faraaz.jabbar@gmail.com',
          sentOn: '2019-05-21T06:29:32.742Z'
        }
      ]
    };
    component.ngOnChanges();

    fixture.detectChanges();
    expect(component.noData).toEqual(false);
  });

  describe('formatDate', () => {
    it('should return formatted date', () => {
      const formattedDate = component.formatDate(new Date());
      expect(formattedDate).toBe(new Date().toLocaleDateString());
    });
  });
});
