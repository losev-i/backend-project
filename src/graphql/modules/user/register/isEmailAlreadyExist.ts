import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import { User } from "../../../entities/User";

/**
 * Validator class (Decorator)
 */
@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  /**
   * Checks if email exists in database
   * @param email The email that is to be searched for
   */
  validate(email: string) {
    if (User.findOne({ email: email.toLowerCase() })) {
      return true;
    }
    return false;
  }
}

/**
 * Exports the decorator
 * @param ValidationOptions
 */
export function IsEmailAlreadyExist(ValidationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: ValidationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint
    });
  };
}
