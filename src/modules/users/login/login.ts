import bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken');
import verify from '../../shared/verify-token';

// our secret, should be stored in an environment variable
const signingKey =
  'Gw;fqR{9s699PfGBt#si;j3&98CX^8d:yqB2EKXBT+3%;WUO;we-gNWmo+l';

import { User } from '../graphQL/user.model';

// returns token, undefined if failed login
export default async function login(
  name: string,
  password: string
): Promise<string> {
  // fetch from db
  let user = await User.findOne({
    where: [{ password: await bcrypt.hash(password, 12) }, { name: name }]
  });

  let token;
  // if User found create token and store
  if (typeof user !== 'undefined') {
    let claims = {
      username: user.name,
      id: user.id,
      role: user.role
    };

    token = await jwt.sign({ claims }, signingKey);
    //let verifiedToken = await jwt.verify(token, signingKey);
    let verifiedToken = verify(token);
    // ToDo: Write the token as bearer token into authorization  header
    // Has to be done via koa I think?
    console.log('--------Token--------');
    console.log(token);
    console.log('--------Verified Token--------');
    console.log(verifiedToken);
    // SessionStorage nicht aus Node moeglich, da browserside API
    // sessionStorage.setItem('token', token);
    // Stattdessen einfach in den authorization header
  }
  return token;
}
