﻿import { Actions, ActionTypes } from './actions';
import { adapter, initialState, State } from './state';

export function reducer(state = initialState, action: Actions): State {
    switch (action.type) {

        case ActionTypes.GET_USERS_REQUEST:
        case ActionTypes.GET_USER_REQUEST:
        case ActionTypes.SAVE_USER_REQUEST:
        case ActionTypes.DELETE_USER_REQUEST: {
            return {
                ...state,
                loading: true,
                error: null
            };
        }
        case ActionTypes.GET_USERS_FAILURE:
        case ActionTypes.GET_USER_FAILURE:
        case ActionTypes.SAVE_USER_FAILURE:
        case ActionTypes.DELETE_USER_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        }

        // Get List
        case ActionTypes.GET_USERS_SUCCESS: {
            return adapter.addAll(action.payload.users, {
                ...state,
                loading: false,
                error: null,
                total: action.payload.total
            });
        }

        // Get
        case ActionTypes.GET_USER_SUCCESS: {
            return adapter.upsertOne(action.payload.user, {
                ...state,
                loading: false,
                error: null
            });
        }

        // Save
        case ActionTypes.SAVE_USER_SUCCESS: {
            const newState = {
                ...state,
                loading: false,
                error: null
            };

            if (action.payload.isNew) {
                return adapter.updateOne({ id: action.payload.user.key, changes: action.payload.user }, newState);
            } else {
                return adapter.addOne(action.payload.user, newState);
            }
        }

        // Delete
        case ActionTypes.DELETE_USER_SUCCESS: {
            return adapter.removeOne(action.payload.key, {
                ...state,
                loading: false,
                error: null
            });
        }

        // Default
        default: {
            return state;
        }
    }
}
