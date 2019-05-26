import { Gift } from './../../shared/models/gift.model';
import { GiftService } from './../../feature-modules/gift/services/gift.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationService } from 'src/app/core/services/translation.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    translation$: Observable<Object>;
    newSection: Observable<Gift[]>;
    highRatedSection: Observable<Gift[]>;

    constructor(
        private giftService: GiftService,
        private translationService: TranslationService) { }

    ngOnInit() {
        this.translation$ = this.translationService.getTranslation('core', 'home', localStorage.getItem('chosenLang'));
        this.newSection = this.giftService.getGiftsByQuery();
        this.highRatedSection = this.giftService.getGiftsByQuery2();
    }
}
