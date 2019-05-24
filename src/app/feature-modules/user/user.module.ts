import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from './../../shared/shared.module';
import { SentGiftsComponent } from './components/sent-gifts/sent-gifts.component';
import { RecievedGiftsComponent } from './components/recieved-gifts/recieved-gifts.component';
import { ReviewGiftComponent } from './components/review-gift/review-gift.component';
import { MDBModalRef } from 'angular-bootstrap-md';
import { AddPointsComponent } from './components/add-points/add-points.component';

@NgModule({
    declarations: [
        OrdersComponent,
        ProfileComponent,
        SentGiftsComponent,
        RecievedGiftsComponent,
        ReviewGiftComponent,
        AddPointsComponent
    ],
    imports: [CommonModule, CoreModule, SharedModule, UserRoutingModule],
    providers: [MDBModalRef],
    entryComponents: [ReviewGiftComponent, AddPointsComponent]
})
export class UserModule {}
