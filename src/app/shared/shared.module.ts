import { RatingComponent } from './ui-components/rating/rating.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftCardComponent } from './ui-components/gift-card/gift-card.component';
import { ButtonComponent } from './ui-components/button/button.component';

@NgModule({
  declarations: [RatingComponent, GiftCardComponent, ButtonComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot()
  ],
  exports: [
    MDBBootstrapModule,
    GiftCardComponent,
    ButtonComponent,
    RatingComponent
  ]
})
export class SharedModule {}
