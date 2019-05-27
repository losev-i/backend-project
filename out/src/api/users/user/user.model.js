"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        index: { unique: true },
        required: true,
        minlength: 5,
        maxlength: 20
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
exports.UserSchema.methods.fullName = function () {
    return this.firstName.trim() + ' ' + this.lastName.trim();
};
/**
 * Method for getting the user -> Welcher Rueckgabetyp ???
 */
exports.UserSchema.methods.getUser = function (userName) {
    const user = exports.UserModel.find({ name: userName });
    return user;
};
exports.UserModel = mongoose_1.model('User', exports.UserSchema);
exports.default = exports.UserModel;
