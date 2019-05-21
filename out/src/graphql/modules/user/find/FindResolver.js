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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../../../entities/User");
const typeorm_1 = require("typeorm");
/**
 * Resolver class
 */
let FindResolver = class FindResolver {
    /**
     * Query which finds User via given email
     * @param email Search criterion
     * @returns User object that matches criterion
     */
    async findByEmail(email) {
        return await typeorm_1.getRepository(User_1.User).findOne({ email: email });
    }
    /**
     * Query which finds all Users
     * @returns Array filled with all users
     */
    async findUsers() {
        return await typeorm_1.getRepository(User_1.User).find({});
    }
    /**
     * Query which finds Users via given name (Consisting of firstName + lastName)
     * @param name Search criterion
     * @returns User objects that matches criterion
     */
    async findByName(name) {
        return await typeorm_1.getRepository(User_1.User).find({ name: name });
    }
    /**
     * Query which finds Users via given lastName
     * @param lastName Search criterion
     * @returns User objects that matches criterion
     */
    async findByLastName(lastName) {
        return await typeorm_1.getRepository(User_1.User).find({ lastName: lastName });
    }
};
__decorate([
    type_graphql_1.Query(returns => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg("email", type => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FindResolver.prototype, "findByEmail", null);
__decorate([
    type_graphql_1.Query(returns => [User_1.User], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FindResolver.prototype, "findUsers", null);
__decorate([
    type_graphql_1.Query(returns => [User_1.User], { nullable: true }),
    __param(0, type_graphql_1.Arg("name", type => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FindResolver.prototype, "findByName", null);
__decorate([
    type_graphql_1.Query(returns => [User_1.User], { nullable: true }),
    __param(0, type_graphql_1.Arg("lastName", type => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FindResolver.prototype, "findByLastName", null);
FindResolver = __decorate([
    type_graphql_1.Resolver()
], FindResolver);
exports.FindResolver = FindResolver;
//# sourceMappingURL=FindResolver.js.map