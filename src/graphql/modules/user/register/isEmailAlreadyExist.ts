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
  async validate(email: string) {
    if (await User.findOne({ email: email.toLowerCase() })) {
      return false;
    }
    return true;
  }
}

/**
 * Exports the decorator
 * @param ValidationOptions
 */
export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: "EmailAlreadyExist",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint
    });
  };
}
