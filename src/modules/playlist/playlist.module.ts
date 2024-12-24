import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Playlist from "./entities/playlist.entity";
import PlaylistController from "./playlist.controller";
import PlaylistService from "./playlist.service";

@Module({
    imports: [TypeOrmModule.forFeature([Playlist])],
    controllers: [PlaylistController],
    providers: [PlaylistService],
})
export default class PlaylistModule {};