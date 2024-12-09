import { Module } from "@nestjs/common";
import { TmdbController } from "./tmdb.controller";

@Module({
    controllers: [TmdbController]
})
export class TmdbModule {};