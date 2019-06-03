import { BaseEntity } from 'typeorm';

import { Role } from '../users/classes/role';

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
