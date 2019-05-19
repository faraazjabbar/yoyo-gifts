import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [SignInComponent, HomeComponent],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
