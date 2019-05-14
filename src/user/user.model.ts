import { Schema, Model, Document, model } from 'mongoose';

export interface IUser {
  firstName: String;
  lastName: String;
  password: String;
  email: String;
}

export interface IUserModel extends IUser, Document {
  fullName(): string;
}

export const UserSchema: Schema = new Schema({
  firstName: {
    required: true,
    type: String
  },
  lastName: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  }
});

UserSchema.methods.fullName = function(): string {
  return this.firstName.trim() + ' ' + this.lastName.trim();
};

export const UserModel: Model<IUserModel> = model<IUserModel>(
  'User',
  UserSchema
);

export default UserModel;
