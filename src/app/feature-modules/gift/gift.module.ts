import { ConfirmationModalComponent } from './../admin/components/confirmation-modal/confirmation-modal.component';
import { AdminModule } from './../admin/admin.module';
import { ManageGiftComponent } from './../admin/components/manage-gift/manage-gift.component';
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
    SharedModule,
    AdminModule
  ],
  entryComponents: [
    ManageGiftComponent,
    ConfirmationModalComponent
  ]
})
export class GiftModule { }
