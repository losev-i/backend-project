"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const RegisterResolver_1 = require("./modules/user/register/RegisterResolver");
const FindResolver_1 = require("./modules/user/find/FindResolver");
const LoginResolver_1 = require("./modules/user/login/LoginResolver");
async function RootSchema() {
    return await type_graphql_1.buildSchema({
        resolvers: [RegisterResolver_1.RegisterResolver, FindResolver_1.FindResolver, LoginResolver_1.LoginResolver]
    });
}
exports.RootSchema = RootSchema;
//# sourceMappingURL=index.js.map