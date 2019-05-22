import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './components/rating/rating.component';
import { GiftFilterComponent } from './gift-filter/gift-filter.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [RatingComponent, GiftFilterComponent],
  imports: [CommonModule, CoreModule],
  exports: [RatingComponent, GiftFilterComponent]
})
export class SharedModule {}
