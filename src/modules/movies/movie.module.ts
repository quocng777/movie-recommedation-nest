import { Module } from "@nestjs/common";
import { MovieController } from "./movie.controller";
import { HttpService } from "@nestjs/axios";

@Module({
    controllers: [MovieController]
})
export class MovieModule {};