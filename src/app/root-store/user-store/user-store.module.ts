import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './reducer';
import { UserStoreEffects } from './effects';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature('user', reducer),
        EffectsModule.forFeature([UserStoreEffects])
    ],
    providers: [
        UserStoreEffects
    ]
})
export class UserStoreModule {}
