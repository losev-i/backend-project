import { Schema, Model, Document, model } from "mongoose";

export interface IUser {
  userName: String;
  password: String;
  email: String;
  foreName: String;
  sureName: String;
}

export interface IUserModel extends IUser, Document {
  fullName(): String;
  //getUser(): ?;
}

export const UserSchema = new Schema({
  userName: {
    type: String,
    index: { unique: true },
    required: true,
    minlength: 5,
    maxlength: 20
  },
  foreName: {
    type: String,
    required: true
  },
  sureName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  email: {
    type: String,
    required: true
  }
});

/**
 * Method for getting fullname of an user
 */
UserSchema.methods.fullName = function(): String {
  return this.foreName.trim() + " " + this.sureName.trim();
};

/**
 * Method for getting the user -> Welcher Rueckgabetyp ???
 */
UserSchema.methods.getUser = function(userName: String) {
  const user = UserModel.find({ name: userName });
  return user;
};

export const UserModel: Model<IUserModel> = model<IUserModel>(
  "User",
  UserSchema
);

export default UserModel;
