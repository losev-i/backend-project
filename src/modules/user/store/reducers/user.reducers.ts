import { Action } from '@ngrx/store';
import {
  createReducer,
  initialEntityState,
  NormalizedEntityState
} from 'ngrx-normalizr-crud';
import { Like } from 'typeorm';

import { UserSchema } from '../../../shared/plain-user-object';
import { User } from '../../graphQL/user.model';
import { from, Observable } from 'rxjs';
import {
  CREATE_USER,
  CreateUser,
  DELETE_USER,
  DeleteUser,
  LOGIN_USER,
  LoginUser,
  READ_USER,
  ReadUser,
  UPDATE_USER,
  UpdateUser
} from '../actions/user.actions';

const entityReducer = createReducer(UserSchema.schema, initialEntityState);

export type UserState = NormalizedEntityState & {
  create: any;
  delete: any;
  read: any;
  update: any;
  login: any;
};

/**
 * Reducer function for User model
 * @param state actual state
 * @param action action has been dispatched
 */
export function reducer(
  state: UserState = {
    ...initialEntityState,
    create: null,
    read: null,
    delete: null,
    update: null,
    login: null
  },
  action: Action
) {
  state = entityReducer(state, action) as UserState;

  switch (action.type) {
    case CREATE_USER: {
      // Bin mir hier sehr unsicher, ob das mit async await funktioniert bei reducer
      // Hier müsste man so langsam Observables einbauen.... glaube ich
      from(User.save((<CreateUser>action).payload));
      return { ...state, create: (<CreateUser>action).payload };
    }

    case READ_USER: {
      const user = from(
        User.find({
          where: [
            { email: Like((<ReadUser>action).payload) },
            { name: Like((<ReadUser>action).payload) }
          ]
        })
      );
      return {
        ...state,
        read: user
      };
    }

    case UPDATE_USER: {
      // await User.update(action.payload);
      return {
        ...state,
        update: (<UpdateUser>action).payload
      };
    }

    case DELETE_USER: {
      from(User.delete((<DeleteUser>action).payload));
      return {
        ...state,
        delete: (<DeleteUser>action).payload
      };
    }

    case LOGIN_USER: {
      const user = from(
        User.find({
          name: (<LoginUser>action).payload.name
        })
      );
      if (user) {
        return {
          ...state,
          login: (<LoginUser>action).payload.name
        };
      }
    }
  }

  return state;
}
