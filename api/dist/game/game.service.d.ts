import { GameEntity } from "./game.entity";
import { Repository } from "typeorm";
import { DeveloperService } from "src/developer/developer.service";
export declare class GameService {
    private readonly gameRepository;
    private readonly developerService;
    constructor(gameRepository: Repository<GameEntity>, developerService: DeveloperService);
    findGameByTitle(title: string): Promise<GameEntity | null>;
    findGameById(id: number): Promise<GameEntity | null>;
    addGameWithStudio(game: GameEntity, developerId: number): Promise<GameEntity>;
    getAllGames(): Promise<GameEntity[]>;
    getGameById(id: number): Promise<GameEntity | undefined>;
    updateGameRating(game: GameEntity): Promise<void>;
    getGamesByStudio(developerId: number): Promise<GameEntity[]>;
    save(game: GameEntity): Promise<GameEntity>;
}
