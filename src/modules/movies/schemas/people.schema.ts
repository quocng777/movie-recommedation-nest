import { Schema, Document } from 'mongoose';
import mongoose from 'mongoose';

export interface IKnownFor {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface ICrew {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credit_id: string;
  department: string;
  job: string;
}

export interface IPeople extends Document {
  tmdb_id: number;
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string;
  movie_credits: {
    cast: IKnownFor[];
    crew: ICrew[];
    id: number;
  };
}

const KnownForSchema = new Schema<IKnownFor>({
  adult: { type: Boolean, required: true },
  backdrop_path: { type: String, required: true },
  genre_ids: { type: [Number], required: true },
  id: { type: Number, required: true },
  original_language: { type: String, required: true },
  original_title: { type: String, required: true },
  overview: { type: String, required: true },
  popularity: { type: Number, required: true },
  poster_path: { type: String, required: true },
  release_date: { type: String, required: true },
  title: { type: String, required: true },
  video: { type: Boolean, required: true },
  vote_average: { type: Number, required: true },
  vote_count: { type: Number, required: true },
  character: { type: String, required: true },
  credit_id: { type: String, required: true },
  order: { type: Number, required: true },
});

const CrewSchema = new Schema<ICrew>({
  adult: { type: Boolean, required: true },
  backdrop_path: { type: String, required: true },
  genre_ids: { type: [Number], required: true },
  id: { type: Number, required: true },
  original_language: { type: String, required: true },
  original_title: { type: String, required: true },
  overview: { type: String, required: true },
  popularity: { type: Number, required: true },
  poster_path: { type: String, required: true },
  release_date: { type: String, required: true },
  title: { type: String, required: true },
  video: { type: Boolean, required: true },
  vote_average: { type: Number, required: true },
  vote_count: { type: Number, required: true },
  credit_id: { type: String, required: true },
  department: { type: String, required: true },
  job: { type: String, required: true },
});

const MovieCreditsSchema = new Schema({
  cast: [KnownForSchema],
  crew: [CrewSchema],
  id: { type: Number, required: true },
});

export const PeopleSchema = new Schema<IPeople>(
  {
    tmdb_id: { type: Number, required: true },
    adult: { type: Boolean, required: true },
    also_known_as: { type: [String], required: false },
    biography: { type: String, required: true },
    birthday: { type: String, required: false },
    deathday: { type: String, required: false },
    gender: { type: Number, required: true },
    homepage: { type: String, required: false },
    imdb_id: { type: String, required: true },
    known_for_department: { type: String, required: true },
    name: { type: String, required: true },
    place_of_birth: { type: String, required: false },
    popularity: { type: Number, required: true },
    profile_path: { type: String, required: true },
    movie_credits: { type: MovieCreditsSchema, required: true },
  },
  { collection: 'people' },
);

export const PeopleModel = mongoose.model<IPeople>('People', PeopleSchema);
