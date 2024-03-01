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
exports.RatingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rating_entity_1 = require("./rating.entity");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../user/user.service");
const game_service_1 = require("../game/game.service");
let RatingService = exports.RatingService = class RatingService {
    constructor(ratingRepository, userService, gameService) {
        this.ratingRepository = ratingRepository;
        this.userService = userService;
        this.gameService = gameService;
    }
    async addRatingToGame(userId, gameId, rating) {
        let existingRating = await this.ratingRepository.findOne({
            where: {
                user: { id: userId },
                game: { id: gameId },
            },
        });
        if (existingRating) {
            existingRating.rating = rating;
            const updatedRating = await this.ratingRepository.save(existingRating);
            await this.updateGameRating(gameId);
            return updatedRating;
        }
        const newRating = new rating_entity_1.RatingEntity();
        newRating.rating = rating;
        newRating.user = await this.userService.findUserById(userId);
        newRating.game = await this.gameService.findGameById(gameId);
        const savedRating = await this.ratingRepository.save(newRating);
        await this.updateGameRating(gameId);
        return savedRating;
    }
    async updateGameRating(gameId) {
        const allRatingsForGame = await this.ratingRepository.find({
            where: { game: { id: gameId } },
        });
        const totalRatings = allRatingsForGame.length;
        let totalRatingSum = 0;
        for (const r of allRatingsForGame) {
            totalRatingSum += r.rating;
        }
        const newRating = totalRatings === 0 ? 0 : totalRatingSum / totalRatings;
        const game = await this.gameService.findGameById(gameId);
        game.rating = newRating;
        await this.gameService.save(game);
    }
};
exports.RatingService = RatingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rating_entity_1.RatingEntity)),
    __param(1, (0, common_1.Inject)(user_service_1.UserService)),
    __param(2, (0, common_1.Inject)(game_service_1.GameService)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService,
        game_service_1.GameService])
], RatingService);
//# sourceMappingURL=rating.service.js.map