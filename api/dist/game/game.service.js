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
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const game_entity_1 = require("./game.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const developer_service_1 = require("../developer/developer.service");
let GameService = exports.GameService = class GameService {
    constructor(gameRepository, developerService) {
        this.gameRepository = gameRepository;
        this.developerService = developerService;
    }
    async findGameByTitle(title) {
        return this.gameRepository.findOne({ where: { title } });
    }
    async findGameById(id) {
        return this.gameRepository.findOneById(id);
    }
    async addGameWithStudio(game, developerId) {
        const developer = await this.developerService.findDeveloperById(developerId);
        if (!developer) {
            throw new common_1.NotFoundException(`Developer with ID ${developerId} not found`);
        }
        game.developer = developer;
        return this.gameRepository.save(game);
    }
    async getAllGames() {
        return this.gameRepository.find();
    }
    async getGameById(id) {
        return this.gameRepository.findOneById(id);
    }
    async updateGameRating(game) {
        await this.gameRepository.update(game.id, { rating: game.rating });
    }
    async getGamesByStudio(developerId) {
        return this.gameRepository.find({
            where: {
                developer: (0, typeorm_2.Equal)(developerId),
            },
        });
    }
    async save(game) {
        try {
            return await this.gameRepository.save(game);
        }
        catch (error) {
            throw new Error(`Error while updating the game: ${error.message}`);
        }
    }
};
exports.GameService = GameService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(game_entity_1.GameEntity)),
    __param(1, (0, common_1.Inject)(developer_service_1.DeveloperService)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        developer_service_1.DeveloperService])
], GameService);
//# sourceMappingURL=game.service.js.map