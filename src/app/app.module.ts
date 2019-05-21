import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { RootStoreModule } from './root-store';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    RootStoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
