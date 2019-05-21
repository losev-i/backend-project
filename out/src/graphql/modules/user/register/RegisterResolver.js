"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const bcrypt = __importStar(require("bcryptjs"));
const User_1 = require("../../../entities/User");
const RegisterInput_1 = require("./RegisterInput");
/**
 * Resolver class
 */
let RegisterResolver = class RegisterResolver {
    /**
     * Resolver class needs query, otherwise an error is thrown
     * Will be replaced
     */
    hello() {
        return "Hello World!";
    }
    /**
     * Registration mutation
     * Has to be extended to include permissions/roles etc. (?)
     * Hashes the password using bcrypt
     * @returns registered User
     */
    async register({ firstName, lastName, email, password }) {
        const user = await User_1.User.create({
            firstName,
            lastName,
            email,
            password: await bcrypt.hash(password, 12)
        }).save();
        return user;
    }
};
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], RegisterResolver.prototype, "hello", null);
__decorate([
    type_graphql_1.Mutation(() => User_1.User),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterInput_1.RegisterInput]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "register", null);
RegisterResolver = __decorate([
    type_graphql_1.Resolver()
], RegisterResolver);
exports.RegisterResolver = RegisterResolver;
//# sourceMappingURL=RegisterResolver.js.map