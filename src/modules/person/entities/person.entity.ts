import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Movies_Casts_Combined } from '@/modules/movies/entities/movie-cast-combined.entity';

@Entity('person')
export class Person {
  @PrimaryColumn('int')
  id: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('boolean')
  adults: boolean;

  @Column('varchar', { array: true, nullable: true })
  also_known_as: string[];

  @Column('text', { nullable: true })
  biography: string;

  @Column('date', { nullable: false })
  birthday: Date;

  @Column('date', { nullable: true })
  deathday: Date;

  @Column('text', { nullable: true })
  place_of_birth: string;

  @Column('int', { nullable: false })
  gender: number;

  @Column('varchar', { nullable: true })
  known_for_department: string;

  @Column('varchar', { nullable: true })
  homepage: string;

  @Column('varchar', { nullable: true })
  imdb_id: string;

  @Column('float', { nullable: false })
  popularity: string;

  @Column('varchar', { nullable: true })
  profile_path: string;

  @OneToMany(() => Movies_Casts_Combined, (movie_cast) => movie_cast.person)
  movie_cast: Movies_Casts_Combined[];
}
