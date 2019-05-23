import { Category, Brand, Gift } from './../../../../shared/models/gift.model';
import { AdminGiftService } from './../../services/admin-gift.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  AbstractControl
} from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-manage-gift',
  templateUrl: './manage-gift.component.html',
  styleUrls: ['./manage-gift.component.scss']
})
export class ManageGiftComponent implements OnInit {
  manageForm: FormGroup;
  heading: string;
  categories: Category[];
  brands: Brand[];
  selectedCategory: string;
  content: Gift;

  constructor(
    public modalRef: MDBModalRef,
    private fb: FormBuilder,
    private adminGiftService: AdminGiftService
  ) {}

  ngOnInit() {
    if (this.content) {
      this.heading = 'Edit Gift';
    } else {
      this.heading = 'Add Gift';
    }
    this.manageForm = this.fb.group({
      giftName: [
        this.content ? this.content.giftName : '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ])
      ],
      description: [
        this.content ? this.content.description : '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(150)
        ])
      ],
      count: [
        this.content ? this.content.count : '',
        Validators.compose([Validators.required, Validators.max(1000)])
      ],
      cost: [
        this.content ? this.content.cost : '',
        Validators.compose([Validators.required, Validators.max(10000)])
      ],
      discount: [
        this.content ? this.content.discount : '',
        Validators.compose([Validators.max(50)])
      ],
      categoryId: [
        this.content ? this.content.categoryId : '-Category-',
        this.categoryValidator
      ],
      brandId: [
        this.content ? this.content.brandId : '-Brand-',
        this.brandValidator
      ],
      imageLink: [this.content ? this.content.imageLink : '']
    });
    this.manageForm.get('brandId').disable();
    if (this.adminGiftService.categories.length < 1) {
      this.adminGiftService
        .getCategories()
        .subscribe((categories: Category[]) => {
          this.categories = categories;
          this.adminGiftService.categories = this.categories;
        });
    } else {
      this.categories = this.adminGiftService.categories;
    }
    if (this.adminGiftService.brands.length < 1) {
      this.adminGiftService.getBrands().subscribe((brands: Brand[]) => {
        this.brands = brands;
        this.adminGiftService.brands = this.brands;
      });
    } else {
      this.brands = this.adminGiftService.brands;
    }
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.manageForm.controls;
  }

  categorySelected(category: string) {
    this.selectedCategory = category;
    this.manageForm.get('brandId').enable();
    this.manageForm.get('brandId').setValue('-Brand-');
  }
  onSubmit() {
    const newGift: any = Object.assign({}, this.manageForm.value);
    newGift.brandId = newGift.brandId ? newGift.brandId : this.content.brandId;
    const brandObj: Brand = this.brands.find((brand: Brand) => {
      return brand.key === newGift.brandId;
    });
    const addGiftObj = {
      ...newGift,
      brandName: brandObj.brandName,
      categoryName: brandObj.categoryName
    };
    console.log(addGiftObj);
    if (this.heading === 'Edit Gift') {
      this.adminGiftService.updateGift({
        key: this.content.key,
        giftedCount: this.content.giftedCount ? this.content.giftedCount : null,
        rating: this.content.rating ? this.content.rating : null,
        ...addGiftObj
      });
    } else {
      this.adminGiftService.addGift(addGiftObj);
    }
  }
  categoryValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value !== undefined && control.value === '-Category-') {
      return { categoryNotSelected: true };
    }
    return null;
  }
  brandValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== undefined && control.value === '-Brand-') {
      return { brandNotSelected: true };
    }
    return null;
  }
}
