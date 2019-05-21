"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../src/index"));
const lodash_1 = __importDefault(require("lodash"));
const typeorm_1 = require("typeorm");
async function start(options) {
    await typeorm_1.createConnection();
    options = lodash_1.default.defaults(options, { port: process.env.PORT || 3000 });
    const instance = await index_1.default();
    instance.listen(options, () => {
        console.log(`Server listening on http://localhost:${options.port}`);
    });
}
start({});
//# sourceMappingURL=www.js.map