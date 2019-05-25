import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { adapter, State } from './state';
import { User } from 'src/app/shared/models/user.model';

export const getState: MemoizedSelector<object, State> = createFeatureSelector<State>('user');

export const getList: (state: object) => User[] = adapter.getSelectors(getState).selectAll;

export const getByKey = (id: string) => createSelector(getState, (state: State) => state.entities[id]);

export const getError: MemoizedSelector<object, string> = createSelector(getState, (state: State) => state.error);

export const getLoading: MemoizedSelector<object, boolean> = createSelector(getState, (state: State) => state.loading);

export const getTotal: MemoizedSelector<object, number> = createSelector(getState, (state: State) => state.total);
