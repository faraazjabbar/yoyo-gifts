import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { adapter, State } from './state';
import { Gift } from 'src/app/shared/models/gift.model';

export const getState: MemoizedSelector<object, State> = createFeatureSelector<State>('gift');

export const getList: (state: object) => Gift[] = adapter.getSelectors(getState).selectAll;

export const getByKey = (key: string) => createSelector(getState, (state: State) => state.entities[key]);

export const getError: MemoizedSelector<object, string> = createSelector(getState, (state: State) => state.error);

export const getLoading: MemoizedSelector<object, boolean> = createSelector(getState, (state: State) => state.loading);

export const getTotal: MemoizedSelector<object, number> = createSelector(getState, (state: State) => state.total);
