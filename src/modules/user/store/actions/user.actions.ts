import { Action } from 'redux';

import { User } from '../../graphQL/user.model';
import { createActions } from 'ngrx-normalizr-crud';
import { UserSchema } from '../../../shared/plain-user-object';

export const CREATE_USER = '[User] Create User';

export const READ_USER = '[User] Read User';

export const UPDATE_USER = '[User] Update User';

export const DELETE_USER = '[User] Delete User';

export const LOGIN_USER = '[User] Login User';

export class CreateUser implements Action {
  /**
   * The action type
   */
  public readonly type = CREATE_USER;
  /**
   * Constructs a new CREATE_USER action
   * @param payload The User object
   */
  constructor(public payload: User) {}
}

export class ReadUser implements Action {
  /**
   * The action type
   */
  public readonly type = READ_USER;
  /**
   * Constructs a new READ_USER action
   * @param payload the string we are searching for
   */
  constructor(public payload: string) {}
}

export class UpdateUser implements Action {
  /**
   * The action type
   */
  public readonly type = UPDATE_USER;
  /**
   * Constructs a new UPDATE_USER action
   * @param payload The User object
   */
  constructor(public payload: User) {}
}

export class DeleteUser implements Action {
  /**
   * The action type
   */
  public readonly type = DELETE_USER;
  /**
   * Constructs a new DELETE_USER action
   * @param payload The UserID
   */
  constructor(public payload: number) {}
}

export class LoginUser implements Action {
  /**
   * the action type
   */
  public readonly type = LOGIN_USER;

  constructor(public payload: { name: string; password: string }) {}
}

/**
 * All normalizr CRUD actions and action creators
 */
export const actions = {
  ...createActions<UserSchema>(UserSchema.schema),
  CREATE_USER,
  CreateUser,
  READ_USER,
  ReadUser,
  UPDATE_USER,
  UpdateUser,
  DELETE_USER,
  DeleteUser,
  LOGIN_USER,
  LoginUser
};
