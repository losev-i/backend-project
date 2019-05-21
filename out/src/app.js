"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_mount_1 = __importDefault(require("koa-mount"));
const graphqlHTTP = require('koa-graphql');
// import routes from './routes';
// import { GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql';
const graphql_1 = require("./graphql");
// import { User } from './graphql/entity/User';
async function app() {
    const app = new koa_1.default();
    app.use(koa_mount_1.default('/graphql', graphqlHTTP({
        schema: await graphql_1.RootSchema(),
        graphiql: process.env.NODE_ENV !== 'production'
    })));
    return app;
}
exports.app = app;
//# sourceMappingURL=app.js.map