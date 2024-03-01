import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { GameEntity } from 'src/game/game.entity';

@Entity("review")
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  review : string;

  @ManyToOne(() => UserEntity, (user) => user.ratings)
  user: UserEntity;

  @ManyToOne(() => GameEntity, (game) => game.ratings)
  game: GameEntity;
}
