import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './core/auth/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './core/gaurds/auth.guard';
import { NoAccessComponent } from './core/components/no-access/no-access.component';

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
    loadChildren: './feature-modules/admin/admin.module#AdminModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: './feature-modules/user/user.module#UserModule'
  },
  {
    path: 'gifts',
    loadChildren: './feature-modules/gift/gift.module#GiftModule'
  },
  { path: 'noAccess', component: NoAccessComponent },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
