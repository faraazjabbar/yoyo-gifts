import { HttpClient } from '@angular/common/http';
import { FirebaseService } from './../../../shared/services/firebase.service';
import { Gift } from './../../../shared/models/gift.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GiftService {
    gifts: any = [];
    constructor(private firebaseService: FirebaseService, private http: HttpClient) {}

    public getGifts() {
        return this.firebaseService.get('/gifts');
    }

    getGiftByKey(key: string) {
        this.firebaseService.getByKey('-LfIigQjjdKusws13mRo');
    }
}
