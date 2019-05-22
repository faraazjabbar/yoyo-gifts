import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { GiftRoutingModule } from './gift-routing.module';

import { GiftListComponent } from './components/gift-list/gift-list.component';
import { GiftDetailsComponent } from './components/gift-details/gift-details.component';
import { GiftReviewComponent } from './components/gift-details/gift-review/gift-review.component';

@NgModule({
  declarations: [
    GiftListComponent,
    GiftDetailsComponent,
    GiftReviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GiftRoutingModule
  ]
})
export class GiftModule { }
