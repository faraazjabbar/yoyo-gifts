import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from 'src/app/shared/models/user.model';

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
    selectId: user => user.key
});

export interface State extends EntityState<User> {
    loading: boolean;
    error?: any;
    total: number;
}

export const initialState: State = adapter.getInitialState({
    loading: false,
    error: null,
    total: 0
});
