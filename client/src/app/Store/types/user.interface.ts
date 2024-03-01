import { EntityState } from '@ngrx/entity';
import { User } from './user.module';

export interface UserState extends EntityState<User> {
  isLoading: boolean;
  error: string | null;
  isLoggedIn: boolean;
  user: User | null;
}
