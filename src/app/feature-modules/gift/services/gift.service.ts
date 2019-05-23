import { HttpClient } from '@angular/common/http';
import { FirebaseService } from './../../../shared/services/firebase.service';
import { Gift } from './../../../shared/models/gift.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GiftService {

    constructor(
        private firebaseService: FirebaseService,
        private http: HttpClient
    ) {}

    getGiftsByQuery(): Observable<Gift[]> {
      return this.firebaseService.getByQuery<Gift>('/gifts');
    }
    getGiftsByQuery2(): Observable<Gift[]> {
      return this.firebaseService.getByQuery2<Gift>('/gifts');
    }

    getGifts(): Observable<Gift[]> {
        return this.firebaseService.get<Gift>('/gifts');
    }

    getGiftByKey(key: string): Observable<Gift> {
        return this.firebaseService.getByKey<Gift>('/gifts', key);
    }
}
