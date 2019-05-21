import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiftRoutingModule } from './gift-routing.module';
import { GiftListComponent } from './components/gift-list/gift-list.component';
import { GiftDetailsComponent } from './components/gift-list/gift-details/gift-details.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [GiftListComponent, GiftDetailsComponent],
  imports: [
    CommonModule,
    GiftRoutingModule,
    SharedModule
  ]
})
export class GiftModule { }
