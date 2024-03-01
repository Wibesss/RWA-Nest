import { GameService } from "./game.service";
import { GameEntity } from "./game.entity";
export declare class GameController {
    private readonly gameService;
    constructor(gameService: GameService);
    addGame(game: GameEntity, studioId: number): Promise<GameEntity>;
    getAllGames(): Promise<GameEntity[]>;
    getGamesByStudio(id: number): Promise<GameEntity[]>;
    getGameById(id: number): Promise<GameEntity>;
    updateGame(game: GameEntity): Promise<GameEntity>;
}
