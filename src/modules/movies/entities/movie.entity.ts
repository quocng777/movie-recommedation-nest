import {
  Entity,
  PrimaryColumn,
  Column,
} from 'typeorm';
import { OneToMany } from 'typeorm';
import { Cast } from './cast.entity';
@Entity('movie') // Tên bảng là "users"
export class Movie {
  @PrimaryColumn('varchar', { length: 24 })
  _id: string; // MongoDB ObjectId dưới dạng chuỗi

  @Column('int', { nullable: false })
  tmdb_id: number; // ID từ TMDb

  @Column('boolean', { default: false })
  adult: boolean; // Nội dung người lớn

  @Column('varchar', { length: 255, nullable: true })
  backdrop_path: string; // Đường dẫn backdrop

  @Column('jsonb', { nullable: true })
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path?: string;
    backdrop_path?: string;
  }; // Dữ liệu thuộc bộ sưu tập

  @Column('int', { default: 0 })
  budget: number; // Ngân sách

  @Column('text', { array: true, nullable: true })
  categories: string[]; // Danh mục

  @Column('jsonb', { nullable: true })
  genres: {
    id: number;
    name: string;
  }[]; // Thể loại phim

  @Column('varchar', { length: 255, nullable: true })
  homepage: string; // Trang web chính thức

  @Column('varchar', { length: 255, nullable: true })
  imdb_id: string; // ID trên IMDb

  @Column('text', { array: true, nullable: true })
  origin_country: string[]; // Quốc gia gốc

  @Column('varchar', { length: 10, nullable: true })
  original_language: string; // Ngôn ngữ gốc

  @Column('varchar', { length: 255, nullable: true })
  original_title: string; // Tên gốc của phim

  @Column('text', { nullable: true })
  overview: string; // Tóm tắt nội dung

  @Column('float', { nullable: true })
  popularity: number; // Độ phổ biến

  @Column('varchar', { length: 255, nullable: true })
  poster_path: string; // Đường dẫn poster

  @Column('jsonb', { nullable: true })
  production_companies: {
    id: number;
    logo_path?: string;
    name: string;
    origin_country: string;
  }[]; // Các công ty sản xuất

  @Column('jsonb', { nullable: true })
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[]; // Các quốc gia sản xuất

  @Column('date', { nullable: true })
  release_date: string; // Ngày phát hành

  @Column('int', { default: 0 })
  revenue: number; // Doanh thu

  @Column('int', { nullable: true })
  runtime: number; // Thời lượng phim

  @Column('jsonb', { nullable: true })
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[]; // Ngôn ngữ được nói

  @Column('varchar', { length: 50, nullable: true })
  status: string; // Trạng thái phát hành

  @Column('text', { nullable: true })
  tagline: string; // Tagline

  @Column('varchar', { length: 255, nullable: true })
  title: string; // Tiêu đề phim

  @Column('boolean', { default: false })
  video: boolean; // Có phải là video không

  @Column('float', { nullable: true })
  vote_average: number; // Điểm trung bình

  @Column('int', { nullable: true })
  vote_count: number; // Số lượt bình chọn


  @Column('jsonb', { nullable: true })
  credits: {
    id: number;
  };

  @OneToMany(() => Cast, (cast) => cast.movie, { cascade: true })
  cast: Cast[];

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
  }[]; // Danh sách trailer

  @Column('jsonb', { nullable: true })
  similar_movies: {
    id: number;
    title: string;
    poster_path?: string;
    release_date?: string;
  }[]; // Phim tương tự

  @Column('jsonb', { nullable: true })
  keywords: {
    id: number;
    name: string;
  }[]; // Danh sách từ khóa

  @Column('jsonb', { nullable: true })
  reviews: {
    author: string;
    content: string;
    created_at: Date;
  }[]; // Danh sách đánh giá
}
