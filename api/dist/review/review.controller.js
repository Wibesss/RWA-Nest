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
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const review_service_1 = require("./review.service");
let ReviewController = exports.ReviewController = class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async addAnime(animeKomentar, animeId, userId) {
        return this.reviewService.createRating(userId, animeId, animeKomentar);
    }
    async addRatingToGame(gameId, userId, body) {
        const { review } = body;
        return this.reviewService.createRating(userId, gameId, review);
    }
    async getAllReviewsForGameById(gameId) {
        return this.reviewService.getAllReviewsForGameById(gameId);
    }
    async deleteReview(reviewId) {
        await this.reviewService.deleteReview(reviewId);
    }
};
__decorate([
    (0, common_1.Post)("addGame"),
    __param(0, (0, common_1.Body)("animeKomentar")),
    __param(1, (0, common_1.Body)("animeId")),
    __param(2, (0, common_1.Body)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "addAnime", null);
__decorate([
    (0, common_1.Post)("addReviewToGame/:gameId/:userId"),
    __param(0, (0, common_1.Param)("gameId")),
    __param(1, (0, common_1.Param)("userId")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "addRatingToGame", null);
__decorate([
    (0, common_1.Get)("getAllReviewsForGameById/:gameId"),
    __param(0, (0, common_1.Param)("gameId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getAllReviewsForGameById", null);
__decorate([
    (0, common_1.Delete)("deleteReviewById/:reviewId"),
    __param(0, (0, common_1.Param)("reviewId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "deleteReview", null);
exports.ReviewController = ReviewController = __decorate([
    (0, common_1.Controller)("review"),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], ReviewController);
//# sourceMappingURL=review.controller.js.map