import { Entity, PrimaryColumn, Column } from 'typeorm';
@Entity('movie') // Tên bảng là "users"
export class Movie {
  @PrimaryColumn('varchar', { length: 24 })
  id: string; 

  @Column('int', { nullable: false })
  tmdb_id: number; 

  @Column('varchar', { length: 255, nullable: true })
  backdrop_path: string; 

  @Column('int', { default: 0 })
  budget: number; 

  @Column('jsonb', { nullable: true })
  genres: {
    id: number;
    name: string;
  }[]; 

  @Column('varchar', { length: 255, nullable: true })
  original_title: string; 

  @Column('text', { nullable: true })
  overview: string; 

  @Column('float', { nullable: true })
  popularity: number;

  @Column('varchar', { length: 255, nullable: true })
  poster_path: string; 

  

  @Column('date', { nullable: true })
  release_date: string;

  @Column('int', { default: 0 })
  revenue: number; 

  @Column('int', { nullable: true })
  runtime: number; 

  @Column('varchar', { length: 50, nullable: true })
  status: string; 

  @Column('text', { nullable: true })
  tagline: string; 

  @Column('varchar', { length: 255, nullable: true })
  title: string; 

  @Column('boolean', { default: false })
  video: boolean; 
  
  @Column('jsonb', { nullable: true })
  trailers: {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: Date;
    id: string;
  }[]; 

  @Column('jsonb', { nullable: true })
  keywords: {
    id: number;
    name: string;
  }[]; 


}
