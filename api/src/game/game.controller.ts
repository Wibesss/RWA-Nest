import { Body, Controller, Post, Put, Get, Param, UseGuards } from "@nestjs/common";
import { GameService } from "./game.service";
import { GameEntity } from "./game.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("game")
export class GameController {
  constructor(private readonly gameService: GameService) {}

  
  @Post('addGame/:studioId')
  async addGame(
    @Body() game: GameEntity,
    @Param('studioId') studioId: number,
  ): Promise<GameEntity> {
    return this.gameService.addGameWithStudio(game, studioId);
  }

  
  @Get('getAllGames')
  async getAllGames(): Promise<GameEntity[]> {
    return this.gameService.getAllGames();
  }
  
  @Get('getGamesByDeveloper/:id')
  getGamesByStudio(@Param('id') id: number) {
    return this.gameService.getGamesByStudio(id);
  }
  @Get('getGameById/:id')
  getGameById(@Param('id') id: number) {
    return this.gameService.getGameById(id);
  }

  
  @Put('updateGame')
  async updateGame(@Body() game: GameEntity): Promise<GameEntity> {
    await this.gameService.updateGameRating(game);
    return game;
  }
}
