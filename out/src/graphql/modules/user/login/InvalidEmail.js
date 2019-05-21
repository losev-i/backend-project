"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const User_1 = require("../../../entities/User");
const typeorm_1 = require("typeorm");
/**
 * Validator class (Decorator)
 */
let InvalidEmailConstraint = class InvalidEmailConstraint {
    /**
     * Checks if email exists in database
     * @param email The email that is to be validated
     * @returns boolean
     */
    validate(email) {
        if (typeorm_1.getRepository(User_1.User).findOne({ email: email })) {
            return true;
        }
        return false;
    }
};
InvalidEmailConstraint = __decorate([
    class_validator_1.ValidatorConstraint({ async: true })
], InvalidEmailConstraint);
exports.InvalidEmailConstraint = InvalidEmailConstraint;
/**
 * Exports the decorator
 * @param ValidationOptions
 */
function InvalidEmail(ValidationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: ValidationOptions,
            constraints: [],
            validator: InvalidEmailConstraint
        });
    };
}
exports.InvalidEmail = InvalidEmail;
//# sourceMappingURL=InvalidEmail.js.map