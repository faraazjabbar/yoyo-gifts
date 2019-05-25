import { GiftStoreState } from './gift-store';
import { UserStoreState } from './user-store';

export interface State {
    gift: GiftStoreState.State;
    user: UserStoreState.State;

}
