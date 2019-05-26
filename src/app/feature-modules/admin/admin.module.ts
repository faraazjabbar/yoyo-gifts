import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ManageGiftComponent } from './components/manage-gift/manage-gift.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component'
import { AdminUserListComponent } from './components/admin-user-list/user-list.component';
import { AdminGiftListComponent } from './components/admin-gift-list/gift-list.component';

@NgModule({
    declarations: [
        ManageGiftComponent,
        DashboardComponent,
        ConfirmationModalComponent,
        AdminUserListComponent,
        AdminGiftListComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        ScrollingModule
    ],
    entryComponents: [
        ManageGiftComponent
    ],
    exports: [
        ManageGiftComponent,
        ConfirmationModalComponent
    ]
})
export class AdminModule {}
