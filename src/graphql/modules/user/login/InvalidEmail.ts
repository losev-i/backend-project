import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator';
import { User } from '../../../entities/User';
import { getRepository } from 'typeorm';

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
		if (getRepository(User).findOne({ email: email })) {
			return true;
		}
		return false;
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
