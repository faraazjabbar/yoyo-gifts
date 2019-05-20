import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageGiftComponent } from './components/manage-gift/manage-gift.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
