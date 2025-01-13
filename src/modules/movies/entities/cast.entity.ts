import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from 'typeorm';
  import { Movie } from './movie.entity'
  
  @Entity('casts')
  export class Cast {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column('boolean', { default: false })
    adult: boolean;
  
    @Column('int', { nullable: true })
    gender: number;
  
    @Column('int', { nullable: false })
    cast_id: number;
  
    @Column('varchar', { length: 255, nullable: true })
    name: string;
  
    @Column('varchar', { length: 255, nullable: true })
    original_name: string;
  
    @Column('float', { nullable: true })
    popularity: number;
  
    @Column('varchar', { length: 255, nullable: true })
    profile_path: string;
  
    @Column('varchar', { length: 255, nullable: true })
    character: string;
  
    @Column('varchar', { length: 255, nullable: true })
    credit_id: string;
  
    @Column('int', { nullable: true })
    "order": number;
  
    @ManyToOne(() => Movie, (movie) => movie.cast)
    movie: Movie;
  }
  