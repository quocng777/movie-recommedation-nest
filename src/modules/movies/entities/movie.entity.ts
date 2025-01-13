import { Entity, PrimaryColumn, Column } from 'typeorm';
@Entity('movie') // Tên bảng là "users"
export class Movie {
  @PrimaryColumn('varchar', { length: 24 })
  id: string;

  @Column('int', { nullable: false })
  tmdb_id: number;

  @Column('text', { nullable: true })
  backdrop_path: string;

  @Column('varchar', { length: 255, nullable: true })
  title: string;

  @Column('varchar', { length: 255, nullable: true })
  original_title: string;

  @Column('text', { nullable: true })
  tagline: string;

  @Column('date', { nullable: true })
  release_date: string;

  @Column('float', { default: 0 })
  budget: number;

  @Column('float', { default: 0 })
  revenue: number;

  @Column('int', { nullable: true })
  runtime: number;

  @Column('float', { nullable: true })
  popularity: number;

  @Column('boolean', { default: false })
  video: boolean;

  @Column('varchar', { length: 50, nullable: true })
  status: string;

  @Column('text', { nullable: true })
  poster_path: string;

  @Column('int', { array: true, nullable: true })
  genres: number[]; 

  @Column('varchar', { array: true, nullable: true })
  trailers: string[]; 
  @Column('text', { nullable: true })
  overview: string;

  @Column('varchar', { nullable: true })
  keywords: string[];
}
