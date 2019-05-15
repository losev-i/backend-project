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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const user_schema_1 = require("./user.schema");
const user_sample_1 = require("./user.sample");
const user_input_1 = require("./user.input");
const class_transformer_1 = require("class-transformer");
function removeByEmail(userList, email) {
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].email == email) {
            userList.splice(i, 1);
        }
    }
}
let UserResolver = class UserResolver {
    constructor() {
        this.userList = user_sample_1.createUserSample();
    }
    user(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userList.find(user => user.email === email);
        });
    }
    users() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userList;
        });
    }
    addUser(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = class_transformer_1.plainToClass(user_schema_1.User, {
                email: userInput.email,
                password: userInput.password
            });
            yield this.userList.push(user);
            return user;
        });
    }
    removeUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield removeByEmail(this.userList, email);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(returns => user_schema_1.User),
    __param(0, type_graphql_1.Arg('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "user", null);
__decorate([
    type_graphql_1.Query(returns => [user_schema_1.User], {
        description: 'Get all the Users from the userList'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    type_graphql_1.Mutation(returns => user_schema_1.User),
    __param(0, type_graphql_1.Arg('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.UserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "addUser", null);
__decorate([
    type_graphql_1.Mutation(returns => Boolean),
    __param(0, type_graphql_1.Arg('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "removeUser", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(of => user_schema_1.User) //Was ist of?
], UserResolver);
exports.UserResolver = UserResolver;
