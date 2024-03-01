import { EntityState } from '@ngrx/entity';
import { DeveloperModel } from './developer.module';

export interface DeveloperState extends EntityState<DeveloperModel> {
  isLoading: boolean;
  error: string | null;
  update: boolean;
}
