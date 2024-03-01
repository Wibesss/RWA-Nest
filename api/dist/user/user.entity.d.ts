import { GameEntity } from 'src/game/game.entity';
import { RatingEntity } from 'src/rating/rating.entity';
import { ReviewEntity } from 'src/review/review.entity';
export declare class UserEntity {
    id: number;
    role: string | null;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    photoURL: string | null;
    ratings: RatingEntity[];
    reviews: ReviewEntity[];
    gameList: GameEntity[];
}
