import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { GiftStoreModule } from './gift-store';
import { UserStoreModule } from './user-store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    GiftStoreModule,
    UserStoreModule,

    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ]
})
export class RootStoreModule { }
