import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReviewEntity } from "./review.entity";
import { Repository } from "typeorm";
import { UserEntity } from "src/user/user.entity";
import { GameEntity } from "src/game/game.entity";
import { UserService } from "src/user/user.service";
import { GameService } from "src/game/game.service";

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(GameService)
    private readonly gameService: GameService
  ) {}

  async createRating(
    userId: number,
    gameId: number,
    review: string
  ): Promise<ReviewEntity> {
    const gameReview = new ReviewEntity();
    gameReview.review = review;
    gameReview.user = await this.userService.findUserById(userId);
    gameReview.game = await this.gameService.findGameById(gameId);

    const savedReview = await this.reviewRepository.save(gameReview);

    return savedReview;
  }

  async getAllReviewsForGameById(gameId: number): Promise<ReviewEntity[]> {
    return await this.reviewRepository
      .createQueryBuilder("comment")
      .where("comment.gameId = :gameId", { gameId })
      .leftJoinAndSelect("comment.user", "user")
      .getMany();
  }

  async deleteReview(reviewId: number): Promise<void> {
    const komentar = await this.reviewRepository.findOneById(reviewId);

    if (!komentar) {
      throw new NotFoundException(`Review with id ${reviewId} not found`);
    }

    await this.reviewRepository.remove(komentar);
  }
}
