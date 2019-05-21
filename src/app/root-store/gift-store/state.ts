import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Gift } from 'src/app/shared/models/gift.model';

export const adapter: EntityAdapter<Gift> = createEntityAdapter<Gift>({
    selectId: gift => gift.key
});

export interface State extends EntityState<Gift> {
    loading: boolean;
    error?: any;
    total: number;
}

export const initialState: State = adapter.getInitialState({
    loading: false,
    error: null,
    total: 0
});
