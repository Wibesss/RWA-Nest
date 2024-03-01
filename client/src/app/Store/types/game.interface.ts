import { EntityState } from '@ngrx/entity';
import { GameModel } from './game.module';

export interface GameState extends EntityState<GameModel> {
  isLoading: boolean;
  update: boolean;
  error: string | null;
}
