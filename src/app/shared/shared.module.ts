import { RatingComponent } from './ui-components/rating/rating.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftCardComponent } from './ui-components/gift-card/gift-card.component';
import { ButtonComponent } from './ui-components/button/button.component';
import { ReversePipe } from './pipes/reverse.pipe';

@NgModule({
  declarations: [RatingComponent, GiftCardComponent, ButtonComponent, ReversePipe],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot()
  ],
  exports: [
    MDBBootstrapModule,
    GiftCardComponent,
    ButtonComponent,
    RatingComponent,
    ReversePipe
  ]
})
export class SharedModule {}
