// our secret, should be stored in an environment variable
const signingKey =
  'Gw;fqR{9s699PfGBt#si;j3&98CX^8d:yqB2EKXBT+3%;WUO;we-gNWmo+l';
const jwt = require('jsonwebtoken');

//
export default function verifyToken(token: string) {
  console.log(signingKey);
  try {
    return jwt.verify(token, signingKey);
  } catch (err) {
    console.error(err);
  }
  // return jwt.verify(token, signingKey, function(err: Error, token: string) {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   return token;
  // });
}
