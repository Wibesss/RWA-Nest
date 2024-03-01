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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const review_entity_1 = require("./review.entity");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../user/user.service");
const game_service_1 = require("../game/game.service");
let ReviewService = exports.ReviewService = class ReviewService {
    constructor(reviewRepository, userService, gameService) {
        this.reviewRepository = reviewRepository;
        this.userService = userService;
        this.gameService = gameService;
    }
    async createRating(userId, gameId, review) {
        const gameReview = new review_entity_1.ReviewEntity();
        gameReview.review = review;
        gameReview.user = await this.userService.findUserById(userId);
        gameReview.game = await this.gameService.findGameById(gameId);
        const savedReview = await this.reviewRepository.save(gameReview);
        return savedReview;
    }
    async getAllReviewsForGameById(gameId) {
        return await this.reviewRepository
            .createQueryBuilder("comment")
            .where("comment.gameId = :gameId", { gameId })
            .leftJoinAndSelect("comment.user", "user")
            .getMany();
    }
    async deleteReview(reviewId) {
        const komentar = await this.reviewRepository.findOneById(reviewId);
        if (!komentar) {
            throw new common_1.NotFoundException(`Review with id ${reviewId} not found`);
        }
        await this.reviewRepository.remove(komentar);
    }
};
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.ReviewEntity)),
    __param(1, (0, common_1.Inject)(user_service_1.UserService)),
    __param(2, (0, common_1.Inject)(game_service_1.GameService)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService,
        game_service_1.GameService])
], ReviewService);
//# sourceMappingURL=review.service.js.map