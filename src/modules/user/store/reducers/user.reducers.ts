import { Action } from '@ngrx/store';
import { initialEntityState, NormalizedEntityState } from 'ngrx-normalizr-crud';

import { User } from '../../graphQL/user.model';
import {
  ADD_USER,
  AddUser,
  DELETE_USER,
  DeleteUser,
  UPDATE_USER,
  UpdateUser
} from '../actions/user.actions';

export type UserState = NormalizedEntityState & {
  add: any;
  delete: any;
  update: any;
};

/**
 * reducer function for User model
 *
 */
export async function reducer(
  state: UserState = {
    ...initialEntityState,
    add: null,
    delete: null,
    update: null
  },
  action: Action
) {
  switch (action.type) {
    case ADD_USER: {
      // Bin mir hier sehr unsicher, ob das mit async await funktioniert bei reducer
      // Hier müsste man so langsam Observables einbauen.... glaube ich
      await User.save(action.payload);
      return { ...state, add: (<AddUser>action).payload };
    }
    case UPDATE_USER: {
      // await User.update(action.payload);
      return {
        ...state,
        update: (<UpdateUser>action).payload
      };
    }
    case DELETE_USER: {
      await User.delete(User, action.payload);
      return {
        ...state,
        delete: (<DeleteUser>action).payload
      };
    }
  }
  return state;
}
