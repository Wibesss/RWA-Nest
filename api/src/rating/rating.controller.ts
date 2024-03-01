import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { RatingService } from "./rating.service";
import { RatingEntity } from "./rating.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("rating")
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  
  @Post("addRatingToGame/:gameId/:userId")
  async addRatingToGame(
    @Param("gameId") gameId: number,
    @Param("userId") userId: number,
    @Body() body: { rating: number }
  ): Promise<RatingEntity> {
    const { rating } = body;
    return this.ratingService.addRatingToGame(userId, gameId, rating);
  }
}
