import { Developer } from './developer.module';

export interface Game {
  id?: number;
  title?: string;
  photoURL?: string;
  rating?: number;
  developer?: Developer;
}
export class GameModel implements Game {
  id?: number;
  title?: string;
  photoURL?: string;
  rating?: number;
  developer?: Developer;
  constructor(
    id?: number,
    title?: string,
    photoURL?: string,
    rating?: number,
    developer?: Developer
  ) {
    this.id = id;
    this.title = title;
    this.photoURL = photoURL;
    this.rating = rating;
    this.developer = developer;
  }
}
