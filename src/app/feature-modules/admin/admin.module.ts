import { UserListComponent } from './components/user-list/user-list.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ManageGiftComponent } from './components/manage-gift/manage-gift.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

@NgModule({
    declarations: [ManageGiftComponent, DashboardComponent, BrandFilterPipe, ConfirmationModalComponent, UserListComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MDBBootstrapModule.forRoot(),
        SharedModule
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
