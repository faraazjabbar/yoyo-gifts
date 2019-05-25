import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as actions from './actions';
import { UserService } from 'src/app/feature-modules/user/services/user.service';

@Injectable()
export class UserStoreEffects {

    constructor(
        private userService: UserService,
        private actions$: Actions
    ) { }

    // Get List
    @Effect()
    getUsersRequest$ = this.actions$.pipe(
        ofType<actions.GetUsersRequestAction>(actions.ActionTypes.GET_USERS_REQUEST),
        switchMap(action =>
            this.userService.getUsers().pipe(
                map(users => new actions.GetUsersSuccessAction({ users: users, total: users.length })),
                catchError(error => of(new actions.GetUsersFailureAction({ error })))
            )
        )
    );

    // Get
    @Effect()
    getUserRequest$ = this.actions$.pipe(
        ofType<actions.GetUserRequestAction>(actions.ActionTypes.GET_USER_REQUEST),
        switchMap(action =>
            this.userService.getUserByKey(action.payload.key).pipe(
                map(user => new actions.GetUserSuccessAction({ user: user })),
                catchError(error => of(new actions.GetUserFailureAction({ error })))
            )
        )
    );

    // // Save
    // @Effect()
    // saveUserRequest$ = this.actions$.pipe(
    //     ofType<actions.SaveUserRequestAction>(actions.ActionTypes.SAVE_USER_REQUEST),
    //     switchMap(action =>
    //         this.userService.save(action.payload.gift).pipe(
    //             map(gift => new actions.SaveUserSuccessAction(
    //                 { gift: gift, isNew: !action.payload.gift.giftId })
    //                 ), catchError(error => of(new actions.SaveUserFailureAction({ error })))
    //         )
    //     )
    // );

    // // Delete
    // @Effect()
    // deleteUserRequest$ = this.actions$.pipe(
    //     ofType<actions.DeleteUserRequestAction>(actions.ActionTypes.DELETE_USER_REQUEST),
    //     switchMap(action =>
    //         this.userService.delete(action.payload.giftId).pipe(
    //             map(() => new actions.DeleteUserSuccessAction({ giftId: action.payload.giftId })),
    //             catchError(error => of(new actions.DeleteUserFailureAction({ error })))
    //         )
    //     )
    // );
}
