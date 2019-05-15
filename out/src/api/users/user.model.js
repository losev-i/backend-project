"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    // _id: {
    // 	type: String
    // },
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
exports.UserSchema.methods.fullName = function () {
    return this.foreName.trim() + ' ' + this.sureName.trim();
};
exports.UserModel = mongoose_1.model('User', exports.UserSchema);
exports.default = exports.UserModel;
