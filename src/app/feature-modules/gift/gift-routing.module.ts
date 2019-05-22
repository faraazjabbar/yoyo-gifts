import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GiftListComponent } from './components/gift-list/gift-list.component';
import { GiftDetailsComponent } from './components/gift-details/gift-details.component';
import { GiftDetailsResolver } from './components/gift-details/gift-details.resolver';

const routes: Routes = [
  {
    path: '',
    component: GiftListComponent
  },
  {
    path: 'details/:giftKey',
    component: GiftDetailsComponent,
    resolve: { gift: GiftDetailsResolver }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiftRoutingModule { }
