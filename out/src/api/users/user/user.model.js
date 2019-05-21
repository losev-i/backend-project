"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
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
exports.UserSchema.methods.fullName = function () {
    return this.firstName.trim() + ' ' + this.lastName.trim();
};
exports.UserModel = mongoose_1.model('User', exports.UserSchema);
exports.default = exports.UserModel;
//# sourceMappingURL=user.model.js.map