import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './reducer';
import { GiftStoreEffects } from './effects';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature('gift', reducer),
        EffectsModule.forFeature([GiftStoreEffects])
    ],
    providers: [
        GiftStoreEffects
    ]
})
export class GiftStoreModule {}
