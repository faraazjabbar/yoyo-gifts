import { RatingComponent } from './ui-components/rating/rating.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftCardComponent } from './ui-components/gift-card/gift-card.component';
import { ButtonComponent } from './ui-components/button/button.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { RouterModule } from '@angular/router';
import { GiftFilterComponent } from './ui-components/gift-filter/gift-filter.component';
import { TranslatePipe } from './pipes/translate.pipe';
import { LookupPipe } from './pipes/lookup.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RatingComponent,
    GiftCardComponent,
    ButtonComponent,
    GiftFilterComponent,
    TranslatePipe,
    LookupPipe,
    ReversePipe
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    MDBBootstrapModule,
    GiftCardComponent,
    ButtonComponent,
    RatingComponent,
    ReversePipe,
    RouterModule,
    GiftFilterComponent,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule {}
