"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const user_schema_1 = require("./user.schema");
function createUserSample() {
    return class_transformer_1.plainToClass(user_schema_1.User, [
        {
            firstName: 'Testy',
            lastName: 'Test',
            password: 'geheim',
            email: 'mail@provider.tld'
        },
        {
            firstName: 'Testy2',
            lastName: 'Test2',
            password: 'geheim',
            email: 'mail2@provider.tld'
        }
    ]);
}
exports.createUserSample = createUserSample;
