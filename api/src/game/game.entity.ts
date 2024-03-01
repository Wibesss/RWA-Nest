import { DeveloperEntity } from "src/developer/developer.entity";
import { RatingEntity } from "src/rating/rating.entity";
import { ReviewEntity } from "src/review/review.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";

@Entity("game")
export class GameEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  photoURL: string | null;

  @Column("decimal", { precision: 4, scale: 2, default: 0 })
  rating: number;

  @ManyToOne(() => DeveloperEntity, (developer) => developer.games)
  developer: DeveloperEntity;

  @OneToMany(() => RatingEntity, (rating) => rating.game)
  ratings: RatingEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.game)
  reviews: ReviewEntity[];
}
