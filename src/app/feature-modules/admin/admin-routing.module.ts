import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminUserListComponent } from './components/admin-user-list/user-list.component';
import { AdminGiftListComponent } from './components/admin-gift-list/gift-list.component';

const routes: Routes = [
    {
        path: '', component: DashboardComponent
    },
    {
        path: 'user-list', component: AdminUserListComponent
    },
    {
        path: 'gift-list', component: AdminGiftListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
