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
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const user_entity_1 = require("./user.entity");
const common_1 = require("@nestjs/common");
const LoginDTO_1 = require("./LoginDTO");
const jwt_1 = require("@nestjs/jwt");
const local_auth_guard_1 = require("../auth/local-auth.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let UserController = exports.UserController = class UserController {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    create(user) {
        return this.userService.createUser(user);
    }
    getAllUsers() {
        return this.userService.getAllUsers();
    }
    getUserById(id) {
        return this.userService.getUserById(id);
    }
    async login(loginDto, response) {
        const token = await this.userService.login(loginDto);
        response.cookie("jwt", token, { httpOnly: false });
        return { message: "success" };
    }
    async getLoggedUser(request) {
        let cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie);
        const userDb = await this.userService.getUserById(data.id);
        return userDb;
    }
    async addGameToUser(userId, gameId) {
        return this.userService.addGameToUser(userId, gameId);
    }
    async updateUserPhoto(userId, photo) {
        return this.userService.updateUserPhoto(userId, photo);
    }
    async logout(response) {
        response.clearCookie("jwt");
        return {
            message: "success",
        };
    }
    async getGamesforUser(userId) {
        const user = await this.userService.getGamesforUser(userId);
        return user.gameList;
    }
    async getUser(userId) {
        const user = await this.userService.getGamesforUser(userId);
        return user.gameList;
    }
    async getUserByUsername(username) {
        const user = await this.userService.getUserByUsername(username);
        return user.gameList;
    }
};
__decorate([
    (0, common_1.Post)("addUser"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("getAllUsers"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('getUserById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDTO_1.LoginDTO, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)("getLoggedUser"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getLoggedUser", null);
__decorate([
    (0, common_1.Post)("addGameToUser/:userId/:gameId"),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, common_1.Param)("gameId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addGameToUser", null);
__decorate([
    (0, common_1.Put)("updateUserPhoto/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, common_1.Body)("photo")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserPhoto", null);
__decorate([
    (0, common_1.Post)("logout"),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)("getGamesforUser/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getGamesforUser", null);
__decorate([
    (0, common_1.Get)("getGamesforUser/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)("getUserByUsername/:username"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByUsername", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], UserController);
//# sourceMappingURL=user.controller.js.map