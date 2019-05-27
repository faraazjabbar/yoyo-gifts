import { SectionComponent } from './ui-components/section/section.component';
import { RatingComponent } from './ui-components/rating/rating.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftCardComponent } from './ui-components/gift-card/gift-card.component';
import { ButtonComponent } from './ui-components/button/button.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from './pipes/translate.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';

@NgModule({
    declarations: [
        RatingComponent,
        GiftCardComponent,
        SectionComponent,
        ButtonComponent,
        TranslatePipe,
        ReversePipe,
        BrandFilterPipe
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
        ReactiveFormsModule,
        FormsModule,
        SectionComponent,
        TranslatePipe,
        BrandFilterPipe
    ]
})
export class SharedModule {}
