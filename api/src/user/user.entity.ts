import { GameEntity } from 'src/game/game.entity';
import { RatingEntity } from 'src/rating/rating.entity';
import { ReviewEntity } from 'src/review/review.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  role: string | null;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  photoURL: string | null;

  @OneToMany(() => RatingEntity, (rating) => rating.user)
  ratings: RatingEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.user)
  reviews: ReviewEntity[];

  @ManyToMany(() => GameEntity)
  @JoinTable()
  gameList: GameEntity[];

}
