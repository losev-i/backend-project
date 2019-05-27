import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
<<<<<<< HEAD
} from "class-validator";
import { User } from "../../../entities/User";
import { getRepository } from "typeorm";
=======
} from 'class-validator';
import { User } from '../../../entities/User';
>>>>>>> origin/JS-5796

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
<<<<<<< HEAD
    if (await getRepository(User).findOne({ email: email })) {
=======
    if (await User.findOne({ email: email.toLowerCase() })) {
>>>>>>> origin/JS-5796
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
      name: 'EmailAlreadyExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint
    });
  };
}
