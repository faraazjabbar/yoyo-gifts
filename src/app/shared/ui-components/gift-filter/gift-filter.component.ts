import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { Category } from '../../models/gift.model';
import { Brand, Gift } from '../../models/gift.model';
import { MdbCheckboxChange } from 'angular-bootstrap-md';

@Component({
  selector: 'app-gift-filter',
  templateUrl: './gift-filter.component.html',
  styleUrls: ['./gift-filter.component.scss']
})
export class GiftFilterComponent implements OnInit, OnChanges {
  @Input()
  categories: Category[];
  @Input()
  brands: Brand[];
  @Input()
  gifts: Gift[];

  public categoriesToShow: Category[] = [];
  public brandsToShow: Brand[] = [];
  public filteredBrandIds: string[] = [];
  public filteredCategoryIds: string[] = [];

  @Output()
  emitFilters = new EventEmitter();

  orderBy = '';
  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.brandsToShow = this.brands;
  }

  public categoryChange(event: MdbCheckboxChange) {
    if (event.checked) {
      this.filteredCategoryIds.push(event.element.value);
    } else {
      this.filteredCategoryIds.splice(
        this.filteredCategoryIds.findIndex(c => c === event.element.value),
        1
      );
    }

    if (this.filteredCategoryIds.length) {
      this.filterBrands();
    } else {
      this.brandsToShow = this.brands;
    }
  }

  public filterBrands() {
    this.brandsToShow = this.brands.filter(b =>
      this.filteredCategoryIds.includes(b.categoryId)
    );
  }

  public checkBrand(key) {
    return this.filteredBrandIds.includes(key);
  }
  public brandChange(event: MdbCheckboxChange) {
    if (event.checked) {
      this.filteredBrandIds.push(event.element.value);
    } else {
      this.filteredBrandIds.splice(
        this.filteredBrandIds.findIndex(c => c === event.element.value),
        1
      );
    }
  }

  public applyFilter() {
    this.emitFilters.emit({
      brands: this.filteredBrandIds,
      order: this.orderBy
    });
  }
}
