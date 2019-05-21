import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { User } from '../../../entities/User';

/**
 * Validator class (Decorator)
 */
@ValidatorConstraint({ async: true })
export class InvalidEmailConstraint implements ValidatorConstraintInterface {
  /**
   * Checks if email exists in database
   * @param email The email that is to be validated
   * @returns boolean
   */
  validate(email: string) {
    if (User.findOne({ email: email.toLowerCase() })) {
      return false;
    }
    return true;
  }
}
/**
 * Exports the decorator
 * @param ValidationOptions
 */
export function InvalidEmail(ValidationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: ValidationOptions,
      constraints: [],
      validator: InvalidEmailConstraint
    });
  };
}
