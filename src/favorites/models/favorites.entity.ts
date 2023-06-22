import { MarvelHero } from 'src/marvel-heros/models/marvel-heros.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';


@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MarvelHero, { eager: true })
  @JoinColumn({ name: "hero_id" })
  hero: MarvelHero;
}
