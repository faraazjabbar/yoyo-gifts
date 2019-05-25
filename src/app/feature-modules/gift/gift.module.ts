import { CoreModule } from 'src/app/core/core.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminModule } from './../admin/admin.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { GiftRoutingModule } from './gift-routing.module';

import { ManageGiftComponent } from './../admin/components/manage-gift/manage-gift.component';
import { ConfirmationModalComponent } from './../admin/components/confirmation-modal/confirmation-modal.component';
import { GiftListComponent } from './components/gift-list/gift-list.component';
import { GiftDetailsComponent } from './components/gift-details/gift-details.component';
import { GiftReviewComponent } from './components/gift-details/gift-review/gift-review.component';
import { FormsModule } from '@angular/forms';
import { GiftSearchComponent } from './components/gift-search/gift-search.component';
import { SearchPipe } from './pipes/search.pipe';
import { GiftFilterComponent } from './components/gift-filter/gift-filter.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
  declarations: [
    GiftListComponent,
    GiftDetailsComponent,
    GiftReviewComponent,
    GiftSearchComponent,
    GiftFilterComponent,
    SearchPipe,
    FilterPipe,
    SortPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    GiftRoutingModule,
    SharedModule,
    FormsModule,
    AdminModule,
    CoreModule
  ],
  entryComponents: [
    ManageGiftComponent,
    ConfirmationModalComponent
  ]
})
export class GiftModule { }
