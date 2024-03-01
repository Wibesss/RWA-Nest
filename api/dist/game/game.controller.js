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
exports.GameController = void 0;
const common_1 = require("@nestjs/common");
const game_service_1 = require("./game.service");
const game_entity_1 = require("./game.entity");
let GameController = exports.GameController = class GameController {
    constructor(gameService) {
        this.gameService = gameService;
    }
    async addGame(game, studioId) {
        return this.gameService.addGameWithStudio(game, studioId);
    }
    async getAllGames() {
        return this.gameService.getAllGames();
    }
    getGamesByStudio(id) {
        return this.gameService.getGamesByStudio(id);
    }
    getGameById(id) {
        return this.gameService.getGameById(id);
    }
    async updateGame(game) {
        await this.gameService.updateGameRating(game);
        return game;
    }
};
__decorate([
    (0, common_1.Post)('addGame/:studioId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('studioId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [game_entity_1.GameEntity, Number]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "addGame", null);
__decorate([
    (0, common_1.Get)('getAllGames'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameController.prototype, "getAllGames", null);
__decorate([
    (0, common_1.Get)('getGamesByDeveloper/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "getGamesByStudio", null);
__decorate([
    (0, common_1.Get)('getGameById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GameController.prototype, "getGameById", null);
__decorate([
    (0, common_1.Put)('updateGame'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [game_entity_1.GameEntity]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "updateGame", null);
exports.GameController = GameController = __decorate([
    (0, common_1.Controller)("game"),
    __metadata("design:paramtypes", [game_service_1.GameService])
], GameController);
//# sourceMappingURL=game.controller.js.map