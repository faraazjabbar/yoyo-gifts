import {
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Brand, Gift, Category } from '../../../../shared/models/gift.model';
import { TranslationService } from 'src/app/core/services/translation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gift-filter',
  templateUrl: './gift-filter.component.html',
  styleUrls: ['./gift-filter.component.scss']
})
export class GiftFilterComponent implements OnInit {
    translation$: Observable<Object>;
    // @Input()
    // categories: Category[];
    // @Input()
    // brands: Brand[];
    // @Input()
    // gifts: Gift[];

    @Output() brandValueArrayEvent = new EventEmitter();
    @Output() pointsValueEvent = new EventEmitter();
    @Output() sortParamEvent = new EventEmitter();
    @Output() sortDirectionEvent = new EventEmitter();
    brandValueArray = [];
    pointsValue = 0;
    sortParamValue = '';
    sortDirection = 'asc';

    constructor(private translationService: TranslationService) {}

    ngOnInit() {
        this.translation$ = this.translationService.getTranslation('gift', 'gift-filter', localStorage.getItem('chosenLang'));
    }
    changeBrand(value: string) {
        if (!this.brandValueArray.includes(value)) {
            this.brandValueArray.push(value);
        }
        this.brandValueArrayEvent.emit(this.brandValueArray);
    }
    changePoints(value: number) {
        this.pointsValue = value;
        this.pointsValueEvent.emit(value);
    }
    changeSortParam(value: string) {
        this.sortParamValue = value;
        this.sortParamEvent.emit(value);
    }
    changeSortDirection(value: string) {
        this.sortDirection = value;
        this.sortDirectionEvent.emit(value);
    }
    resetBrandValue(value: string) {
        this.brandValueArray.splice(
            this.brandValueArray.findIndex(b => b === value), 1
        );
        this.brandValueArrayEvent.emit(this.brandValueArray);
    }
    resetPointsValue() {
        this.pointsValue = 0;
        this.pointsValueEvent.emit(0);
    }
    resetSortParamValue() {
        this.sortParamValue = '';
        this.sortParamEvent.emit('');
    }
}
