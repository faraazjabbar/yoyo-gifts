import { GiftService } from './../../gift/services/gift.service';
import { Gift } from './../../../shared/models/gift.model';
import { Injectable } from '@angular/core';
import { FirebaseService } from './../../../shared/services/firebase.service';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGiftService {

  constructor(private firebase: FirebaseService) { }
}
