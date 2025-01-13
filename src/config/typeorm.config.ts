import { config as dotenvConfig } from "dotenv";
import LikedMovie from "../modules/movies/entities/liked-movie.entity";
import User from "../modules/user/entities/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";
import WatchLater from "@/modules/movies/entities/watch-later.entity";
import Playlist from "@/modules/playlist/entities/playlist.entity";
import PlaylistItem from "@/modules/playlist/entities/playlist-item.entity";
import Rating from "@/modules/movies/entities/rating.entity";
import Review from "@/modules/movies/entities/review.entity";
import { Movie } from "@/modules/movies/entities/movie.entity";
import { Person } from "@/modules/person/entities/person.entity";
import { Movies_Casts_Combined } from "@/modules/movies/entities/movie-cast-combined.entity";

const nodeEnv = process.env.NODE_ENV || 'development';

dotenvConfig(
  {
    path: nodeEnv !== 'production' ? '.env' : `.env.${nodeEnv}`
  }
);

export const dataSourceOptions: DataSourceOptions = {
    synchronize: true,
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number.parseInt(process.env.DB_PORT),
    migrationsTableName: '_migrations',
    entities: [User, LikedMovie, WatchLater, Playlist, PlaylistItem, Rating, Review, Movie, Person, Movies_Casts_Combined],
    migrations: ['dist/migrations/*{.ts,.js}'], //problem: when you want to run migration please change the path to 'src/migration/*{.ts,.js}''. I'm trying to fix it, but not now
    migrationsRun: false,
};

export const dataSource = new DataSource(dataSourceOptions);