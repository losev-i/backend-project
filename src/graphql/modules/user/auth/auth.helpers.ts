import { User, Role } from '../../../entities/User';
import { plainToClass } from 'class-transformer';
import { ObjectID } from 'typeorm';
import { AuthChecker } from 'type-graphql';

export const userAuthChecker: AuthChecker<boolean> = () => {
	const users = User.find({});

	// if @Authorized() check only if user exist
	if (users) {
		return users !== undefined;
	}
	// TODO: checking other roles

	// if no user restrict access
	if (!users) {
		return false;
	}

	// restrict acces if no roles matched
	return false;
};
