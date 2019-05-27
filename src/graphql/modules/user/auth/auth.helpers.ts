import { User } from "../../../entities/User";
import { AuthChecker } from "type-graphql";

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

  // restrict access if no roles matched
  return false;
};
