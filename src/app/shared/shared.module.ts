import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './components/rating/rating.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RatingComponent],
  imports: [CommonModule, FormsModule],
  exports: [RatingComponent, FormsModule]
})
export class SharedModule {}
