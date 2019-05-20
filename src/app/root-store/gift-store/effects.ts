import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as actions from './actions';
import { GiftService } from 'src/app/core/services/gift.service';

@Injectable()
export class GiftStoreEffects {

    constructor(
        private giftService: GiftService,
        private actions$: Actions
    ) { }

    // Get List
    @Effect()
    getGiftsRequest$ = this.actions$.pipe(
        ofType<actions.GetGiftsRequestAction>(actions.ActionTypes.GET_GIFTS_REQUEST),
        switchMap(action =>
            this.giftService.getList(action.payload.pageNumber, action.payload.pageSize, action.payload.filters, action.payload.sort).pipe(
                map(queryResult => new actions.GetGiftsSuccessAction({ gifts: queryResult.data, total: queryResult.total })),
                catchError(error => of(new actions.GetGiftsFailureAction({ error })))
            )
        )
    );

    // Get
    @Effect()
    getGiftRequest$ = this.actions$.pipe(
        ofType<actions.GetGiftRequestAction>(actions.ActionTypes.GET_GIFT_REQUEST),
        switchMap(action =>
            this.giftService.getById(action.payload.giftId).pipe(
                map(gift => new actions.GetGiftSuccessAction({ gift: gift })),
                catchError(error => of(new actions.GetGiftFailureAction({ error })))
            )
        )
    );

    // Save
    @Effect()
    saveGiftRequest$ = this.actions$.pipe(
        ofType<actions.SaveGiftRequestAction>(actions.ActionTypes.SAVE_GIFT_REQUEST),
        switchMap(action =>
            this.giftService.save(action.payload.gift).pipe(
                map(gift => new actions.SaveGiftSuccessAction(
                    { gift: gift, isNew: !action.payload.gift.giftId })
                    ), catchError(error => of(new actions.SaveGiftFailureAction({ error })))
            )
        )
    );

    // Delete
    @Effect()
    deleteGiftRequest$ = this.actions$.pipe(
        ofType<actions.DeleteGiftRequestAction>(actions.ActionTypes.DELETE_GIFT_REQUEST),
        switchMap(action =>
            this.giftService.delete(action.payload.giftId).pipe(
                map(() => new actions.DeleteGiftSuccessAction({ giftId: action.payload.giftId })),
                catchError(error => of(new actions.DeleteGiftFailureAction({ error })))
            )
        )
    );
}
