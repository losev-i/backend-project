import passport from "koa-passport";
//import session from 'koa-session';
import bodyparser from "koa-bodyparser";
import ls from "passport-local";
import app from "./index";
import { IUser, UserSchema } from "../users/user/user.model";
import { ParameterizedContext } from "koa";

const LocalStrategy = ls.Strategy;

export async function get(ctx: ParameterizedContext, next: Function) {
  if (ctx.isAuthenticated()) {
    await next();
  } else {
    ctx.isUnauthenticated();
    ctx.status = 401;
    ctx.body = {
      errors: [{ title: "Login required", status: 401 }]
    };
  }
  await ctx.login();
  // ctx.logout();
  // ctx.state.user;
  await next();
}

export async function login() {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user: IUser, done) => {
    done(null, { username: user.userName });
  });

  passport.deserializeUser(async (user: IUser, done) => {
    done(null, user);
  });

  const options = {
    userNameField: "user[email]",
    passwordField: "user[password]"
  };

  passport.use(
    new LocalStrategy(options, (userName, password, done) => {
      () => {
        try {
          const user = UserSchema.methods.getUser(userName);
          if (user.userName === userName && user.password === password) {
            return user;
          } else {
            return null;
          }
        } catch (e) {
          return null;
        }
      };
    })
  );
}

// export default passport;
