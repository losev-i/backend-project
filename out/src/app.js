'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const koa_1 = __importDefault(require('koa'));
const koa_mount_1 = __importDefault(require('koa-mount'));
const koa_passport_1 = __importDefault(require('koa-passport'));
const routes_1 = __importDefault(require('./routes'));
const mongoose_1 = __importDefault(require('mongoose'));
const koa_logger_1 = __importDefault(require('koa-logger'));
mongoose_1.default.connect('mongodb://localhost/backend-project', {
  useNewUrlParser: true
});
mongoose_1.default.set('useCreateIndex', true);
exports.app = new koa_1.default();
exports.app.keys = ['secret-keys'];
exports.app
  .use(koa_logger_1.default())
  .use(koa_mount_1.default('/', routes_1.default))
  .use(koa_passport_1.default.initialize())
  .use(koa_passport_1.default.session());
exports.default = exports.app;
