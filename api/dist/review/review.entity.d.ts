import { UserEntity } from '../user/user.entity';
import { GameEntity } from 'src/game/game.entity';
export declare class ReviewEntity {
    id: number;
    review: string;
    user: UserEntity;
    game: GameEntity;
}
