import { ReviewEntity } from "./review.entity";
import { Repository } from "typeorm";
import { UserService } from "src/user/user.service";
import { GameService } from "src/game/game.service";
export declare class ReviewService {
    private readonly reviewRepository;
    private readonly userService;
    private readonly gameService;
    constructor(reviewRepository: Repository<ReviewEntity>, userService: UserService, gameService: GameService);
    createRating(userId: number, gameId: number, review: string): Promise<ReviewEntity>;
    getAllReviewsForGameById(gameId: number): Promise<ReviewEntity[]>;
    deleteReview(reviewId: number): Promise<void>;
}
