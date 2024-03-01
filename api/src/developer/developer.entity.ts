import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { GameEntity } from "src/game/game.entity";

@Entity("developer")
export class DeveloperEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  photoURL: string;

  @OneToMany(() => GameEntity, (game) => game.developer)
  games: GameEntity[];
}
