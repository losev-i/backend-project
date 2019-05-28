'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const koa_1 = __importDefault(require('koa'));
const koa_mount_1 = __importDefault(require('koa-mount'));
const koa_bodyparser_1 = __importDefault(require('koa-bodyparser'));
const home_1 = __importDefault(require('./api/home'));
const login_1 = __importDefault(require('./api/users/login'));
const user_1 = __importDefault(require('./api/users/user'));
const app = new koa_1.default();
app
  .use(koa_bodyparser_1.default())
  .use(koa_mount_1.default('/', home_1.default))
  //.use(mount('/auth', auth))
  .use(koa_mount_1.default('/login', login_1.default))
  .use(koa_mount_1.default('/user', user_1.default));
exports.default = app;
