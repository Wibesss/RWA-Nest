import { UserEntity } from '../user/user.entity';
import { GameEntity } from 'src/game/game.entity';
export declare class RatingEntity {
    id: number;
    rating: number;
    user: UserEntity;
    game: GameEntity;
}
