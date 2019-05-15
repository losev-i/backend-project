"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
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
exports.UserSchema.methods.fullName = function () {
    return this.firstName.trim() + ' ' + this.lastName.trim();
};
exports.UserModel = mongoose_1.model('User', exports.UserSchema);
exports.default = exports.UserModel;
