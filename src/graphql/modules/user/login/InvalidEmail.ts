import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { User } from '../../../entity/User';
import { getRepository, Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
export class InvalidEmailConstraint implements ValidatorConstraintInterface {
  validate(email: string) {
    if (getRepository(User).findOne({ email: email })) {
      return true;
    }
    return false;
  }
}

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
