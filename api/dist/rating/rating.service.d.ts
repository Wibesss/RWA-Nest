import { RatingEntity } from "./rating.entity";
import { Repository } from "typeorm";
import { UserService } from "src/user/user.service";
import { GameService } from "src/game/game.service";
export declare class RatingService {
    private readonly ratingRepository;
    private readonly userService;
    private readonly gameService;
    constructor(ratingRepository: Repository<RatingEntity>, userService: UserService, gameService: GameService);
    addRatingToGame(userId: number, gameId: number, rating: number): Promise<RatingEntity>;
    updateGameRating(gameId: number): Promise<void>;
}
