import { Module } from "@nestjs/common";
import { MovieController } from "./movie.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import LikedMovie from "./entities/liked-movie.entity";
import MovieService from "./movie.service";
import { TmdbModule } from "../tmdb/tmdb.module";
import WatchLater from "./entities/watch-later.entity";
import Rating from "./entities/rating.entity";
import Review from "./entities/review.entity";

@Module({
    imports: [TypeOrmModule.forFeature([LikedMovie, WatchLater, Rating, Review]), TmdbModule],
    controllers: [MovieController],
    providers: [MovieService],
})
export class MovieModule{};