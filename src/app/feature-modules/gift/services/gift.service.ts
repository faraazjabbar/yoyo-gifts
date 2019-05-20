import { FirebaseService } from './../../../shared/services/firebase.service';
import { Gift } from './../../../shared/models/gift.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GiftService {
  gifts: any = [];
  constructor(private firebaseService: FirebaseService) { }


  public getGifts() {
    this.gifts = this.firebaseService.get('/gifts');
      console.log(this.gifts);
    }
}
