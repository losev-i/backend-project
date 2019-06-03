import { Action } from 'redux';
import { UserSettings } from '../../classes/settings';

export const ADD_USER = '[User] Add User';

export const UPDATE_USER = '[User] Update User';

export class AddUser implements Action {
  /**
   * The action type
   */
  public readonly type = ADD_USER;
  /**
   * Constructs a new ADD_USER action
   * @param payload The settings data
   */
  constructor(public payload: UserSettings) {}
}

export class UpdateUser implements Action {
  /**
   * The action type
   */
  public readonly type = UPDATE_USER;
  /**
   * Constructs a new UPDATE_USER action
   * @param payload The settings data
   */
  constructor(public payload: UserSettings) {}
}
