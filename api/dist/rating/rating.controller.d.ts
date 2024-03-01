import { RatingService } from "./rating.service";
import { RatingEntity } from "./rating.entity";
export declare class RatingController {
    private readonly ratingService;
    constructor(ratingService: RatingService);
    addRatingToGame(gameId: number, userId: number, body: {
        rating: number;
    }): Promise<RatingEntity>;
}
