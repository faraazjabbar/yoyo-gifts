import { GiftService } from './../../gift/services/gift.service';
import { Gift, Brand, Category } from './../../../shared/models/gift.model';
import { Injectable } from '@angular/core';
import { FirebaseService } from './../../../shared/services/firebase.service';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminGiftService {
    categories: Category[] = [];
    brands: Brand[] = [];
    constructor(
        private firebaseService: FirebaseService,
        private giftSeravaice: GiftService
    ) {}

    addGift(gift: Gift) {
        return this.firebaseService.add('/gifts', gift);
    }
    updateGift(gift: Gift) {
        return this.firebaseService.update('/gifts', gift);
    }
    deleteGift(gift: Gift) {
        return this.firebaseService.delete('/gifts', gift);
    }
    deleteByKey(giftKey: string): Observable<any> {
        return this.firebaseService.getByKey<Gift>('/gifts', giftKey)
            .pipe(
                switchMap(gift => {
                    return this.firebaseService.delete<Gift>('/gifts', gift);
                })
            );
    }
    getCategories(): Observable<Category[]> {
        return this.firebaseService.get<Category>('/categories');
    }
    getBrands(): Observable<Brand[]> {
        return this.firebaseService.get<Brand>('/brands');
    }
}
