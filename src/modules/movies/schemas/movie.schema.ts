import { Schema, Document, Types } from 'mongoose';
import { Genre } from './genre.schema'; 
import mongoose from 'mongoose';
export interface Movie extends Document {
  adult: boolean;
  backdrop_path: string;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  keywords: string[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  tagline: string;
  genres: Types.Array<Genre>;
  runtime: number;
  status: string;
  budget: number;
  belongs_to_collection: object;
  revenue: number;
  imdb_id: string;
  categories: string[];
  credits: object;
  similar_movies: Types.Array<Movie>;
  production_companies: string[];
  production_countries: string[];
  spoken_languages: string[];
  trailers: string[];
  reviews: Object[];
}

export const MovieSchema = new Schema<Movie>({
  adult: { type: Boolean, required: true },
  backdrop_path: { type: String, required: true },
  title: { type: String, required: true },
  original_language: { type: String, required: true },
  original_title: { type: String, required: true },
  overview: { type: String, required: true },
  poster_path: { type: String, required: true },
  media_type: { type: String, required: true },
  genre_ids: { type: [Number], required: true },
  popularity: { type: Number, required: true },
  release_date: { type: String, required: true },
  video: { type: Boolean, required: true },
  vote_average: { type: Number, required: true },
  vote_count: { type: Number, required: true },
  tagline: { type: String },
  genres: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
  runtime: { type: Number, required: true },
  status: { type: String, required: true },
  budget: { type: Number, required: true },
  revenue: { type: Number, required: true },
  keywords: [{ type: String }],
  belongs_to_collection: { type: Object },
  production_companies: [{ type: String }],
  production_countries: [{ type: String }],
  spoken_languages: [{ type: String }],
  trailers: [{ type: String }],
  reviews: [{ type: Schema.Types.ObjectId }],
  categories: [{ type: String }], 
  credits: { type: Object }, 
  similar_movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }], 
  imdb_id: { type: String }, 
  
},
{ collection: 'movies' }
);

export const MovieModel = mongoose.model<Movie>('Movie', MovieSchema);
