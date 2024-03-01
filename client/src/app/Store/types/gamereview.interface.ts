import { EntityState } from '@ngrx/entity';
import { GameReviewModel } from './gamereview.module';

export interface GameReviewState extends EntityState<GameReviewModel> {
  isLoading: boolean;
  error: string | null;
  update: boolean;
}