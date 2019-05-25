import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as actions from './actions';
import { GiftService } from 'src/app/feature-modules/gift/services/gift.service';
import { AdminGiftService } from 'src/app/feature-modules/admin/services/admin-gift.service';

@Injectable()
export class GiftStoreEffects {

    constructor(
        private giftService: GiftService,
        private adminGiftService: AdminGiftService,
        private actions$: Actions
    ) { }

    // Get List
    @Effect()
    getGiftsRequest$ = this.actions$.pipe(
        ofType<actions.GetGiftsRequestAction>(actions.ActionTypes.GET_GIFTS_REQUEST),
        switchMap(action =>
            this.giftService.getGifts().pipe(
                map(gifts => new actions.GetGiftsSuccessAction({ gifts: gifts, total: gifts.length })),
                catchError(error => of(new actions.GetGiftsFailureAction({ error })))
            )
        )
    );

    // Get
    @Effect()
    getGiftRequest$ = this.actions$.pipe(
        ofType<actions.GetGiftRequestAction>(actions.ActionTypes.GET_GIFT_REQUEST),
        switchMap(action =>
            this.giftService.getGiftByKey(action.payload.key).pipe(
                map(gift => new actions.GetGiftSuccessAction({ gift: gift })),
                catchError(error => of(new actions.GetGiftFailureAction({ error })))
            )
        )
    );

    // // Save
    // @Effect()
    // saveGiftRequest$ = this.actions$.pipe(
    //     ofType<actions.SaveGiftRequestAction>(actions.ActionTypes.SAVE_GIFT_REQUEST),
    //     switchMap(action =>
    //         this.giftService.save(action.payload.gift).pipe(
    //             map(gift => new actions.SaveGiftSuccessAction(
    //                 { gift: gift, isNew: !action.payload.gift.giftId })
    //                 ), catchError(error => of(new actions.SaveGiftFailureAction({ error })))
    //         )
    //     )
    // );

    // Delete
    @Effect()
    deleteGiftRequest$ = this.actions$.pipe(
        ofType<actions.DeleteGiftRequestAction>(actions.ActionTypes.DELETE_GIFT_REQUEST),
        switchMap(action =>
            this.adminGiftService.deleteByKey(action.payload.key).pipe(
                map(() => new actions.DeleteGiftSuccessAction({ key: action.payload.key })),
                catchError(error => of(new actions.DeleteGiftFailureAction({ error })))
            )
        )
    );
}
