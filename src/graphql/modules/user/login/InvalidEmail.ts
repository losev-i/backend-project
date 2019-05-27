import {
<<<<<<< HEAD
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator';
import { User } from '../../../entities/User';
import { getRepository } from 'typeorm';
=======
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { User } from '../../../entities/User';
>>>>>>> origin/JS-5796

/**
 * Validator class (Decorator)
 */
@ValidatorConstraint({ async: true })
export class InvalidEmailConstraint implements ValidatorConstraintInterface {
<<<<<<< HEAD
	/**
	 * Checks if email exists in database
	 * @param email The email that is to be validated
	 * @returns boolean
	 */
	validate(email: string) {
		if (getRepository(User).findOne({ email: email })) {
			return true;
		}
		return false;
	}
=======
  /**
   * Checks if email exists in database
   * @param email The email that is to be validated
   * @returns boolean
   */
  async validate(email: string) {
    if (await User.findOne({ email: email.toLowerCase() })) {
      return true;
    }
    return false;
  }
>>>>>>> origin/JS-5796
}
/**
 * Exports the decorator
 * @param ValidationOptions
 */
export function InvalidEmail(ValidationOptions?: ValidationOptions) {
<<<<<<< HEAD
	return function(object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: ValidationOptions,
			constraints: [],
			validator: InvalidEmailConstraint
		});
	};
=======
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'Email does not exist.',
      target: object.constructor,
      propertyName: propertyName,
      options: ValidationOptions,
      constraints: [],
      validator: InvalidEmailConstraint
    });
  };
>>>>>>> origin/JS-5796
}
