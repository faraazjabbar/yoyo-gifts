import {
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Brand, Gift, Category } from '../../../../shared/models/gift.model';

@Component({
  selector: 'app-gift-filter',
  templateUrl: './gift-filter.component.html',
  styleUrls: ['./gift-filter.component.scss']
})
export class GiftFilterComponent implements OnInit {
  // @Input()
  // categories: Category[];
  // @Input()
  // brands: Brand[];
  // @Input()
  // gifts: Gift[];

  @Output() brandValueEvent = new EventEmitter();
  @Output() pointsValueEvent = new EventEmitter();
  @Output() sortParamEvent = new EventEmitter();
  @Output() sortDirectionEvent = new EventEmitter();
  brandValue = '';
  pointsValue = 0;
  sortParamValue = '';
  sortDirection = 'asc';

  constructor() {}

  ngOnInit() {}
  changeBrand(value: string) {
    this.brandValue = value;
    this.brandValueEvent.emit(value);
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
  resetBrandValue() {
    this.brandValue = '';
    this.brandValueEvent.emit('');
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
