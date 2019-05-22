import { RatingComponent } from './components/rating/rating.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftCardComponent } from './ui-components/gift-card/gift-card.component';
import { ButtonComponent } from './ui-components/button/button.component';
import { RouterModule } from '@angular/router';
import { GiftFilterComponent } from './ui-components/gift-filter/gift-filter.component';
import { CoreModule } from './../core/core.module';
import { TranslatePipe } from './pipes/translate.pipe';
import { LookupPipe } from './pipes/lookup.pipe';

@NgModule({
  declarations: [
    RatingComponent,
    GiftCardComponent,
    ButtonComponent,
    GiftFilterComponent,
    TranslatePipe,
    LookupPipe
  ],
  imports: [
    CommonModule,
    CoreModule,
    MDBBootstrapModule.forRoot(),
    RouterModule
  ],
  exports: [
    MDBBootstrapModule,
    GiftCardComponent,
    ButtonComponent,
    RatingComponent,
    RouterModule,
    GiftFilterComponent
  ]
})
export class SharedModule {}
