import bcrypt from "bcryptjs";

import { User } from "../graphQL/user.model";

const jwt = require("jsonwebtoken");
// returns token, undefined if failed login
export default async function login(
  name: string,
  password: string
): Promise<void> {
  // fetch from db
  let user = await User.findOne({
    where: [{ password: await bcrypt.hash(password, 12) }, { name: name }]
  });

  let token;
  // if User found create token and store
  if (user) {
    token = jwt.sign({ name }, "secret");
    console.log(token);
    // SessionStorage nicht aus Node moeglich, da browswerside API
    //sessionStorage.setItem("token", token);
    //Stattdessen einfach in den authorization header
  }
  return token;
}
