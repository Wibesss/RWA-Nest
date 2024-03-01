import { EntityState } from '@ngrx/entity';
import { GameRating } from './gamerating.module';

export interface GameRatingState {
  isLoading: boolean;
  gamerating: GameRating | null;
  error: string | null;
}