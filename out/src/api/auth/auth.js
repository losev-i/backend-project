"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_passport_1 = __importDefault(require("koa-passport"));
//import LocalStrategy from 'passport-local';
const users_1 = __importDefault(require("../users"));
// const fetchUser = ((user) => {
// 	const id = user.getID();
// 	const name = user.getUserName();
// 	const password = user.getPassword();
// 	return async function() {
// 	  return user
// 	};
//   })()
// passport.serializeUser((user, done) {
// 	done(null, {username: user.userName});
// });
// passport.deserializeUser((user, done) => {
// 	done(null, user);
// });
users_1.default.use(koa_passport_1.default.initialize());
users_1.default.use(koa_passport_1.default.session());
const options = {};
// app.use(new LocalStrategy(options, (username, password, done) => {
// 	User.findOne({userName: String}, function(err, user) {
// 		if (err) {
// 			return done(err);
// 		}
// 		if (!user) {
// 			return done(null, false);
// 		}
// 		if (!user.verifyPAssword(password)) {
// 			return done(null, false);
// 		}
// 		return done(null, user);
// 	})
// }));
// Routen
//app.use(./routes...);
