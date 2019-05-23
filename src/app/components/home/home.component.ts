import { Gift } from './../../shared/models/gift.model';
import { GiftService } from './../../feature-modules/gift/services/gift.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newSection: Observable<Gift[]>;
  highRatedSection: Observable<Gift[]>;

  constructor(private giftService: GiftService) { }

  ngOnInit() {
    this.newSection = this.giftService.getGiftsByQuery();
    this.highRatedSection = this.giftService.getGiftsByQuery2();
  }

}
