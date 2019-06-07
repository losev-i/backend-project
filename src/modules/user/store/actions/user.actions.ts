import { Action } from 'redux';

import { User } from '../../graphQL/user.model';

export const ADD_USER = '[User] Add User';

export const UPDATE_USER = '[User] Update User';

export const DELETE_USER = '[User] Delete User';

export class AddUser implements Action {
  /**
   * The action type
   */
  public readonly type = ADD_USER;
  /**
   * Constructs a new ADD_USER action
   * @param payload The User object
   */
  constructor(public payload: User) {}
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

/**
 * the actions about user settings
 */
const settingsActions = {
  ADD_USER,
  UPDATE_USER,
  DELETE_USER
};

/**
 * All normalizr CRUD actions and action creators
 */
export const actions = {
  ...settingsActions
};
