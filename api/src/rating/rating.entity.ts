import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { GameEntity } from 'src/game/game.entity';

@Entity("rating")
export class RatingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @ManyToOne(() => UserEntity, (user) => user.ratings)
  user: UserEntity;

  @ManyToOne(() => GameEntity, (game) => game.ratings)
  game: GameEntity;
}