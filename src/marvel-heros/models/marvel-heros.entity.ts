import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class MarvelHero {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

}
