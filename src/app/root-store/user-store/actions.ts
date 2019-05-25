import { Action } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

export enum ActionTypes {
    // Get list
    GET_USERS_REQUEST = '[User] Get Users Request',
    GET_USERS_FAILURE = '[User] Get Users Failure',
    GET_USERS_SUCCESS = '[User] Get Users Success',

    // Get
    GET_USER_REQUEST = '[User] Get User Request',
    GET_USER_FAILURE = '[User] Get User Failure',
    GET_USER_SUCCESS = '[User] Get User Success',

    // Save
    SAVE_USER_REQUEST = '[User] Save User Request',
    SAVE_USER_FAILURE = '[User] Save User Failure',
    SAVE_USER_SUCCESS = '[User] Save User Success',

    // Delete
    DELETE_USER_REQUEST = '[User] Delete User Request',
    DELETE_USER_FAILURE = '[User] Delete User Failure',
    DELETE_USER_SUCCESS = '[User] Delete User Success'
}

// Get List
export class GetUsersRequestAction implements Action {
    readonly type = ActionTypes.GET_USERS_REQUEST;
    constructor(public payload: { pageNumber?: number, pageSize?: number}) {}
}

export class GetUsersFailureAction implements Action {
    readonly type = ActionTypes.GET_USERS_FAILURE;
    constructor(public payload: { error: string }) {}
}

export class GetUsersSuccessAction implements Action {
    readonly type = ActionTypes.GET_USERS_SUCCESS;
    constructor(public payload: { users: User[], total: number }) {}
}

// Get
export class GetUserRequestAction implements Action {
    readonly type = ActionTypes.GET_USER_REQUEST;
    constructor(public payload: { key: string }) {}
}

export class GetUserFailureAction implements Action {
    readonly type = ActionTypes.GET_USER_FAILURE;
    constructor(public payload: { error: string }) {}
}

export class GetUserSuccessAction implements Action {
    readonly type = ActionTypes.GET_USER_SUCCESS;
    constructor(public payload: { user: User }) {}
}

// Save
export class SaveUserRequestAction implements Action {
    readonly type = ActionTypes.SAVE_USER_REQUEST;
    constructor(public payload: { user: User }) {}
}

export class SaveUserFailureAction implements Action {
    readonly type = ActionTypes.SAVE_USER_FAILURE;
    constructor(public payload: { error: string }) {}
}

export class SaveUserSuccessAction implements Action {
    readonly type = ActionTypes.SAVE_USER_SUCCESS;
    constructor(public payload: { user: User, isNew: boolean }) {}
}

// Delete
export class DeleteUserRequestAction implements Action {
    readonly type = ActionTypes.DELETE_USER_REQUEST;
    constructor(public payload: { key: string }) {}
}

export class DeleteUserFailureAction implements Action {
    readonly type = ActionTypes.DELETE_USER_FAILURE;
    constructor(public payload: { error: string }) {}
}

export class DeleteUserSuccessAction implements Action {
    readonly type = ActionTypes.DELETE_USER_SUCCESS;
    constructor(public payload: { key: string }) {}
}

export type Actions =
    GetUsersRequestAction | GetUsersFailureAction | GetUsersSuccessAction |
    GetUserRequestAction | GetUserFailureAction | GetUserSuccessAction |
    SaveUserRequestAction | SaveUserFailureAction | SaveUserSuccessAction |
    DeleteUserRequestAction | DeleteUserFailureAction | DeleteUserSuccessAction;
