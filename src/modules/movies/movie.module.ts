import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieController } from "./movie.controller";
import MovieService from "./movie.service";

// TypeORM Entities
import LikedMovie from "./entities/liked-movie.entity";
import WatchLater from "./entities/watch-later.entity";
import Rating from "./entities/rating.entity";
import Review from "./entities/review.entity";

// Mongoose Schema
import { Movie, MovieSchema } from "./schemas/movie.schema"
import { TmdbModule } from "../tmdb/tmdb.module";

@Module({
  imports: [ 
    MongooseModule.forFeature([{ name: "movies", schema: MovieSchema }]),
    TypeOrmModule.forFeature([LikedMovie, WatchLater, Rating, Review]),
    TmdbModule
  ], 
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
