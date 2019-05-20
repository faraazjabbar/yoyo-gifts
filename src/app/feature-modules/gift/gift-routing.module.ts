import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GiftListComponent } from './components/gift-list/gift-list.component';

const routes: Routes = [
  {
    path: '', component: GiftListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiftRoutingModule { }
