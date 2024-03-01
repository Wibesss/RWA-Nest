import { Game } from './game.module';

export interface GameStatee {
  isLoading: boolean;
  game: Game | null;
  error: string | null;
}