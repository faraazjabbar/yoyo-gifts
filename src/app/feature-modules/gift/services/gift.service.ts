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

  getGifts() {
    this.firebaseService.get('/gifts').subscribe((data: Gift) => {
      console.log(data);
    });
  }
  getGiftByKey(gift: any) {
    this.firebaseService.getByKey('-LfIigQjjdKusws13mRo');
}
}
