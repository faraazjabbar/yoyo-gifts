import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiftRoutingModule } from './gift-routing.module';
import { GiftListComponent } from './components/gift-list/gift-list.component';
import { GiftDetailsComponent } from './components/gift-details/gift-details.component';

@NgModule({
  declarations: [
    GiftListComponent,
    GiftDetailsComponent
  ],
  imports: [
    CommonModule,
    GiftRoutingModule
  ]
})
export class GiftModule { }
