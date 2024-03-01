import { DeveloperEntity } from "src/developer/developer.entity";
import { RatingEntity } from "src/rating/rating.entity";
import { ReviewEntity } from "src/review/review.entity";
export declare class GameEntity {
    id: number;
    title: string;
    photoURL: string | null;
    rating: number;
    developer: DeveloperEntity;
    ratings: RatingEntity[];
    reviews: ReviewEntity[];
}
