import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationService } from 'src/app/core/services/translation.service';

@Component({
  selector: 'app-gift-search',
  templateUrl: './gift-search.component.html',
  styleUrls: ['./gift-search.component.scss']
})
export class GiftSearchComponent implements OnInit {
    translation$: Observable<Object>;
    searchValue: string;
    @Output() searchValueEvent: EventEmitter<string> = new EventEmitter<string>();

    constructor(private translationService: TranslationService) { }

    ngOnInit() {
        this.translation$ = this.translationService.getTranslation('gift', 'gift-search', localStorage.getItem('chosenLang'));
    }
    emitSearchValue() {
        this.searchValueEvent.emit(this.searchValue);
    }
}
