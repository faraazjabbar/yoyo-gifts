import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageGiftComponent } from './components/manage-gift/manage-gift.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { GiftListComponent } from './components/gift-list/gift-list.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent
  },
  {
    path: 'user-list', component: UserListComponent
  },
  {
    path: 'gift-list', component: GiftListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
