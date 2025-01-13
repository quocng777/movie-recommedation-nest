import {
  Entity,
  PrimaryColumn,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Movie } from './movie.entity';
import { Person } from '@/modules/person/entities/person.entity';
@Entity('movie_cast_combined')
export class Movies_Casts_Combined {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Movie, (movie) => movie.movie_cast, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  movie_id: string;
  @ManyToOne(() => Person, (person) => person.movie_cast, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  cast_id: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  profile_image: string;
}
