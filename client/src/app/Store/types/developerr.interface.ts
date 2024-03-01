import { EntityState } from '@ngrx/entity';
import { Developer } from './developer.module';

export interface DeveloperStatee {
  isLoading: boolean;
  developer: Developer | null;
  error: string | null;
}
