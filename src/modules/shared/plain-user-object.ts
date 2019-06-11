import { BaseEntity } from 'typeorm';

import { Role } from '../user/classes/role';
import { schema } from 'normalizr';
import { Schemable } from './classes/schemable';
import { staticImplements } from './classes/static-implements.decorator';

export interface PlainUserInterface {
  id: string;
  name: string;
  password: string;
  email: string;
  role: Role;
  firstName?: string;
  lastName?: string;
}

export class PlainUser extends BaseEntity implements PlainUserInterface {
  id!: string;
  name!: string;
  email!: string;
  role!: Role;
  password!: string;
  firstName?: string;
  lastName?: string;
}

@staticImplements<Schemable>()
export class UserSchema {
  static schema = new schema.Entity('user');

  id!: string;
  name!: string;
  email!: string;
  role!: Role;
  password!: string;
  firstName?: string;
  lastName?: string;
}
