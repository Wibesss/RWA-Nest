import { Game } from './game.module';
import { User } from './user.module';

export interface GameReview {
  id?: number;
  review?: string;
  anime?: Game;
  user?: User;
}

export class GameReviewModel implements GameReview {
  id?: number;
  review?: string;
  game?: Game;
  user?: User;
  constructor(id?: number, review?: string, anime?: Game, user?: User) {
    this.id = id;
    this.review = review;
    this.game = anime;
    this.user = user;
  }
}
