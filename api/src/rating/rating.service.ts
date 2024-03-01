import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RatingEntity } from "./rating.entity";
import { Repository } from "typeorm";
import { UserEntity } from "src/user/user.entity";
import { GameEntity } from "src/game/game.entity";
import { UserService } from "src/user/user.service";
import { GameService } from "src/game/game.service";

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(GameService)
    private readonly gameService: GameService
  ) {}

  async addRatingToGame(
    userId: number,
    gameId: number,
    rating: number
  ): Promise<RatingEntity> {
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
    const newRating = new RatingEntity();
    newRating.rating = rating;
    newRating.user = await this.userService.findUserById(userId);
    newRating.game = await this.gameService.findGameById(gameId);
    const savedRating = await this.ratingRepository.save(newRating);
    await this.updateGameRating(gameId);
    return savedRating;
  }

  async updateGameRating(gameId: number): Promise<void> {
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
}
