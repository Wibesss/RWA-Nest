import { Game } from './game.module';
import { User } from './user.module';

export interface GameRating {
  id?: number;
  rating?: number;
  anime?: Game;
  user?: User;
}

export class GameRatingModel implements GameRating {
  id?: number;
  rating?: number;
  game?: Game;
  user?: User;
  constructor(id?: number, rating?: number, anime?: Game, user?: User) {
    this.id = id;
    this.rating = rating;
    this.game = anime;
    this.user = user;
  }
}
