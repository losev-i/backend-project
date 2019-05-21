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
const User_1 = require("../../../entities/User");
const bcrypt = __importStar(require("bcryptjs"));
const LoginInput_1 = require("./LoginInput");
const typeorm_1 = require("typeorm");
/**
 * Resolver class
 */
let LoginResolver = class LoginResolver {
    /**
     * Login mutation
     * Has to be extended to include permissions etc. (?)
     * @returns null if user credentials are invalid, else User object
     */
    async login({ email, password }) {
        const user = await typeorm_1.getRepository(User_1.User).findOne({ email: email });
        if (!user) {
            return null;
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return null;
        }
        return user;
    }
};
__decorate([
    type_graphql_1.Mutation(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginInput_1.LoginInput]),
    __metadata("design:returntype", Promise)
], LoginResolver.prototype, "login", null);
LoginResolver = __decorate([
    type_graphql_1.Resolver()
], LoginResolver);
exports.LoginResolver = LoginResolver;
//# sourceMappingURL=LoginResolver.js.map