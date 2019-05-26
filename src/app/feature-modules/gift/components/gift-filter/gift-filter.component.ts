import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core';
import { Brand} from '../../../../shared/models/gift.model';

@Component({
  selector: 'app-gift-filter',
  templateUrl: './gift-filter.component.html',
  styleUrls: ['./gift-filter.component.scss']
})
export class GiftFilterComponent implements OnInit, OnChanges {

    @Input() category;
  @Output() brandValueArrayEvent = new EventEmitter();
  @Output() pointsValueEvent = new EventEmitter();
  @Output() sortParamEvent = new EventEmitter();
  @Output() sortDirectionEvent = new EventEmitter();
  oldCategory: string;
  brandValueArray = [];
  brands$: Observable<Brand[]>;
  pointsValue = 0;
  sortParamValue = '';
  sortDirection = 'asc';

  constructor(private fbService: FirebaseService) {}

  ngOnInit() {
      this.brands$ = this.fbService.get('/brands');
  }
  ngOnChanges() {
    if (this.oldCategory !== this.category) {
        this.resetFilters();
        this.oldCategory = this.category;
    }
  }
  resetFilters() {
      this.resetPointsValue();
      this.resetSortParamValue();
      this.brandValueArray = [];
      this.brandValueArrayEvent.emit(this.brandValueArray);
  }
  changeBrand(value: string) {
    const brandName = value.toLocaleLowerCase();
    if (!this.brandValueArray.includes(brandName)) {
        this.brandValueArray.push(brandName);
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
    this.pointsValueEvent.emit(this.pointsValue);
  }
  resetSortParamValue() {
    this.sortParamValue = '';
    this.sortDirection = 'asc';
    this.sortParamEvent.emit(this.sortParamValue);
    this.sortDirectionEvent.emit(this.sortDirection);
  }
}
