'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value);
            }).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const index_1 = __importDefault(require('../src/index'));
const lodash_1 = __importDefault(require('lodash'));
function start(options) {
  return __awaiter(this, void 0, void 0, function*() {
    options = lodash_1.default.defaults(options, {
      port: process.env.PORT || 3000
    });
    yield index_1.default.listen(options);
    console.log(`Server listening on port ${options.port}`);
  });
}
start({});
