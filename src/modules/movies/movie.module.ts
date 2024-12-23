import { Module } from "@nestjs/common";
import { MovieController } from "./movie.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import LikedMovie from "./entities/liked-movie.entity";
import MovieService from "./movie.service";
import { TmdbModule } from "../tmdb/tmdb.module";

@Module({
    imports: [TypeOrmModule.forFeature([LikedMovie]), TmdbModule],
    controllers: [MovieController],
    providers: [MovieService],
})
export class MovieModule{};