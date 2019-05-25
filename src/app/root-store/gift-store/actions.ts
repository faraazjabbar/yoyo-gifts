import { Action } from '@ngrx/store';
import { Gift } from 'src/app/shared/models/gift.model';

export enum ActionTypes {
    // Get list
    GET_GIFTS_REQUEST = '[Gift] Get Gifts Request',
    GET_GIFTS_FAILURE = '[Gift] Get Gifts Failure',
    GET_GIFTS_SUCCESS = '[Gift] Get Gifts Success',

    // Get
    GET_GIFT_REQUEST = '[Gift] Get Gift Request',
    GET_GIFT_FAILURE = '[Gift] Get Gift Failure',
    GET_GIFT_SUCCESS = '[Gift] Get Gift Success',

    // Save
    SAVE_GIFT_REQUEST = '[Gift] Save Gift Request',
    SAVE_GIFT_FAILURE = '[Gift] Save Gift Failure',
    SAVE_GIFT_SUCCESS = '[Gift] Save Gift Success',

    // Delete
    DELETE_GIFT_REQUEST = '[Gift] Delete Gift Request',
    DELETE_GIFT_FAILURE = '[Gift] Delete Gift Failure',
    DELETE_GIFT_SUCCESS = '[Gift] Delete Gift Success'
}

// Get List
export class GetGiftsRequestAction implements Action {
    readonly type = ActionTypes.GET_GIFTS_REQUEST;
    constructor(public payload: { pageNumber?: number, pageSize?: number}) {}
}

export class GetGiftsFailureAction implements Action {
    readonly type = ActionTypes.GET_GIFTS_FAILURE;
    constructor(public payload: { error: string }) {}
}

export class GetGiftsSuccessAction implements Action {
    readonly type = ActionTypes.GET_GIFTS_SUCCESS;
    constructor(public payload: { gifts: Gift[], total: number }) {}
}

// Get
export class GetGiftRequestAction implements Action {
    readonly type = ActionTypes.GET_GIFT_REQUEST;
    constructor(public payload: { key: string }) {}
}

export class GetGiftFailureAction implements Action {
    readonly type = ActionTypes.GET_GIFT_FAILURE;
    constructor(public payload: { error: string }) {}
}

export class GetGiftSuccessAction implements Action {
    readonly type = ActionTypes.GET_GIFT_SUCCESS;
    constructor(public payload: { gift: Gift }) {}
}

// Save
export class SaveGiftRequestAction implements Action {
    readonly type = ActionTypes.SAVE_GIFT_REQUEST;
    constructor(public payload: { gift: Gift }) {}
}

export class SaveGiftFailureAction implements Action {
    readonly type = ActionTypes.SAVE_GIFT_FAILURE;
    constructor(public payload: { error: string }) {}
}

export class SaveGiftSuccessAction implements Action {
    readonly type = ActionTypes.SAVE_GIFT_SUCCESS;
    constructor(public payload: { gift: Gift, isNew: boolean }) {}
}

// Delete
export class DeleteGiftRequestAction implements Action {
    readonly type = ActionTypes.DELETE_GIFT_REQUEST;
    constructor(public payload: { key: string }) {}
}

export class DeleteGiftFailureAction implements Action {
    readonly type = ActionTypes.DELETE_GIFT_FAILURE;
    constructor(public payload: { error: string }) {}
}

export class DeleteGiftSuccessAction implements Action {
    readonly type = ActionTypes.DELETE_GIFT_SUCCESS;
    constructor(public payload: { key: string }) {}
}

export type Actions =
    GetGiftsRequestAction | GetGiftsFailureAction | GetGiftsSuccessAction |
    GetGiftRequestAction | GetGiftFailureAction | GetGiftSuccessAction |
    SaveGiftRequestAction | SaveGiftFailureAction | SaveGiftSuccessAction |
    DeleteGiftRequestAction | DeleteGiftFailureAction | DeleteGiftSuccessAction;
