import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './core/auth/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'signIn',
    component: SignInComponent
  },
  {
    path: 'admin',
    loadChildren: './feature-modules/admin/admin.module#AdminModule'
  },
  {
    path: 'user',
    loadChildren: './feature-modules/user/user.module#AdminModule'
  },
  {
    path: 'gifts',
    loadChildren: './feature-modules/gift/gift.module#GiftModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
