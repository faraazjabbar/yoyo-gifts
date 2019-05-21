import { Actions, ActionTypes } from './actions';
import { adapter, initialState, State } from './state';

export function reducer(state = initialState, action: Actions): State {
    switch (action.type) {

        case ActionTypes.GET_GIFTS_REQUEST:
        case ActionTypes.GET_GIFT_REQUEST:
        case ActionTypes.SAVE_GIFT_REQUEST:
        case ActionTypes.DELETE_GIFT_REQUEST: {
            return {
                ...state,
                loading: true,
                error: null
            };
        }
        case ActionTypes.GET_GIFTS_FAILURE:
        case ActionTypes.GET_GIFT_FAILURE:
        case ActionTypes.SAVE_GIFT_FAILURE:
        case ActionTypes.DELETE_GIFT_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        }

        // Get List
        case ActionTypes.GET_GIFTS_SUCCESS: {
            return adapter.addAll(action.payload.gifts, {
                ...state,
                loading: false,
                error: null,
                total: action.payload.total
            });
        }

        // Get
        case ActionTypes.GET_GIFT_SUCCESS: {
            return adapter.upsertOne(action.payload.gift, {
                ...state,
                loading: false,
                error: null
            });
        }

        // Save
        case ActionTypes.SAVE_GIFT_SUCCESS: {
            const newState = {
                ...state,
                loading: false,
                error: null
            };

            if (action.payload.isNew) {
                return adapter.updateOne({ id: action.payload.gift.key, changes: action.payload.gift }, newState);
            } else {
                return adapter.addOne(action.payload.gift, newState);
            }
        }

        // Delete
        case ActionTypes.DELETE_GIFT_SUCCESS: {
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
