import { Controller, Post, Body, Get, Delete, Param } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { ReviewEntity } from "./review.entity";

@Controller("review")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post("addGame")
  async addAnime(
    @Body("animeKomentar") animeKomentar: string,
    @Body("animeId") animeId: number,
    @Body("userId") userId: number
  ): Promise<ReviewEntity> {
    return this.reviewService.createRating(userId, animeId, animeKomentar);
  }

  @Post("addReviewToGame/:gameId/:userId")
  async addRatingToGame(
    @Param("gameId") gameId: number,
    @Param("userId") userId: number,
    @Body() body: { review: string }
  ): Promise<ReviewEntity> {
    const { review } = body;
    return this.reviewService.createRating(userId, gameId, review);
  }

  @Get("getAllReviewsForGameById/:gameId")
  async getAllReviewsForGameById(
    @Param("gameId") gameId: number
  ): Promise<ReviewEntity[]> {
    return this.reviewService.getAllReviewsForGameById(gameId);
  }

  @Delete("deleteReviewById/:reviewId")
  async deleteReview(@Param("reviewId") reviewId: number) {
    await this.reviewService.deleteReview(reviewId);
  }
}
