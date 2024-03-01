import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { GameEntity } from "./game.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Equal, Repository } from "typeorm";
import { DeveloperService } from "src/developer/developer.service";
import { DeveloperEntity } from "src/developer/developer.entity";

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>,
    @Inject(DeveloperService)
    private readonly developerService: DeveloperService
  ) {}

  async findGameByTitle(title: string): Promise<GameEntity | null> {
    return this.gameRepository.findOne({ where: { title } });
  }

  async findGameById(id: number): Promise<GameEntity | null> {
    return this.gameRepository.findOneById(id);
  }

  async addGameWithStudio(
    game: GameEntity,
    developerId: number
  ): Promise<GameEntity> {
    const developer = await this.developerService.findDeveloperById(developerId);
    if (!developer) {
      throw new NotFoundException(`Developer with ID ${developerId} not found`);
    }
    game.developer = developer;
    return this.gameRepository.save(game);
  }


  async getAllGames(): Promise<GameEntity[]> {
    return this.gameRepository.find();
  }
  async getGameById(id: number): Promise<GameEntity | undefined> {
    return this.gameRepository.findOneById(id);
  }
  async updateGameRating(game: GameEntity): Promise<void> {
    await this.gameRepository.update(game.id, { rating: game.rating });
  }
  async getGamesByStudio(developerId: number): Promise<GameEntity[]> {
    return this.gameRepository.find({
      where: {
        developer: Equal(developerId),
      },
    });
  }
  async save(game: GameEntity): Promise<GameEntity> {
    try {
      return await this.gameRepository.save(game);
    } catch (error) {
      throw new Error(`Error while updating the game: ${error.message}`);
    }
  }
}
