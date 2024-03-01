import { ReviewService } from "./review.service";
import { ReviewEntity } from "./review.entity";
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    addAnime(animeKomentar: string, animeId: number, userId: number): Promise<ReviewEntity>;
    addRatingToGame(gameId: number, userId: number, body: {
        review: string;
    }): Promise<ReviewEntity>;
    getAllReviewsForGameById(gameId: number): Promise<ReviewEntity[]>;
    deleteReview(reviewId: number): Promise<void>;
}
