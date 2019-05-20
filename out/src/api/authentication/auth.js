"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const fetchUser = (() => {
    const user = { id: 1, username: 'test', password: 'test' };
    return () => __awaiter(this, void 0, void 0, function* () {
        return user;
    });
})();
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield fetchUser();
        done(null, user);
    }
    catch (err) {
        done(err);
    }
}));
passport.use(new LocalStrategy((username, password, done) => {
    fetchUser()
        .then(user => {
        if (username === user.username && password === user.password) {
            done(null, user);
        }
        else {
            done(null, false);
        }
    })
        .catch(err => {
        done(err);
    });
}));
