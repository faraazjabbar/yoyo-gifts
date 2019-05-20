import { GiftService } from './../../gift/services/gift.service';
import { Gift } from './../../../shared/models/gift.model';
import { Injectable } from '@angular/core';
import { FirebaseService } from './../../../shared/services/firebase.service';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGiftService {

  constructor(private firebaseService: FirebaseService) { }

  addGift() {
    const gift = {
      brandId: '-LfIdeIyqlhjpbpw_YPl',
      brandName: 'Added test',
      categoryId: '-LfIa4GVaSL9wz4xas9c',
      categoryName: 'Ecommerce',
      cost: 1000,
      count: 10,
      description: 'Amazon gift voucher worth 1000 rs.',
      discount: 10,
      giftName: 'Amazon gift voucher',
      imageLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn...',
      rating: 4
    };
    this.firebaseService.add('/gifts', gift);
  }
  updateGift() {
    const gift = {
      key: '-LfJphQNPRpaNvvrxqq1',
      brandId: '-LfIdeIyqlhjpbpw_YPl',
      brandName: 'Amazon 2',
      categoryId: '-LfIa4GVaSL9wz4xas9c',
      categoryName: 'Ecommerce',
      cost: 1000,
      count: 10,
      description: 'Amazon gift voucher worth 1000 rs.',
      discount: 10,
      giftName: 'Amazon gift voucher',
      imageLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn...',
      rating: 4
    };
    this.firebaseService.update('/gifts', gift);
  }
  deleteGift() {
    const gift = {
      key: '-LfJphQNPRpaNvvrxqq1',
      brandId: '-LfIdeIyqlhjpbpw_YPl',
      brandName: 'Amazon 2',
      categoryId: '-LfIa4GVaSL9wz4xas9c',
      categoryName: 'Ecommerce',
      cost: 1000,
      count: 10,
      description: 'Amazon gift voucher worth 1000 rs.',
      discount: 10,
      giftName: 'Amazon gift voucher',
      imageLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn...',
      rating: 4
    };
    this.firebaseService.delete('/gifts', gift);
  }
}
