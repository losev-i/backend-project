import { Schema, Model, Document, model } from 'mongoose';

export interface IUser {
  userName: String;
  firstName: String;
  lastName: String;
  password: String;
  email: String;
}

export interface IUserModel extends IUser, Document {
  fullName(): String;
}

export const UserSchema = new Schema({
  userName: {
    type: String,
    index: { unique: true },
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

UserSchema.methods.fullName = function(): String {
  return this.firstName.trim() + ' ' + this.lastName.trim();
};

export const UserModel: Model<IUserModel> = model<IUserModel>(
  'User',
  UserSchema
);

export default UserModel;
