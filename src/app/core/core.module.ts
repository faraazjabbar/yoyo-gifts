import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { environment } from '../../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [SignInComponent, HomeComponent],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    MDBBootstrapModule.forRoot()
  ],
  exports: [
    AngularFireModule,
    AngularFireDatabaseModule,
    MDBBootstrapModule,
  ]
})
export class CoreModule { }
