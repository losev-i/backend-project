import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { createSelectors } from 'ngrx-normalizr-crud';

import { UserSchema } from '../../shared/plain-user-object';
import { reducer, UserState } from './reducers/user.reducers';

export * from './actions/user.actions';

export const USER_STATE_KEY = 'user';

export interface State {
  users: UserState;
}

const featureSelector = createFeatureSelector<State>(USER_STATE_KEY);

const getUserState = createSelector(
  featureSelector,
  (state: State) => state.users
);

const getUserCreate = createSelector(
  getUserState,
  (state: UserState) => state.create
);

const getUserUpdate = createSelector(
  getUserState,
  (state: UserState) => state.update
);

const getUserRead = createSelector(
  getUserState,
  (state: UserState) => state.read
);

const getUserDelete = createSelector(
  getUserState,
  (state: UserState) => state.delete
);

const getUserLogin = createSelector(
  getUserState,
  (state: UserState) => state.login
);

export const reducers: ActionReducerMap<State> = {
  users: reducer
};

export const selectors = {
  ...createSelectors<UserSchema>(UserSchema.schema, getUserState),
  getUserCreate,
  getUserRead,
  getUserUpdate,
  getUserDelete,
  getUserLogin
};
