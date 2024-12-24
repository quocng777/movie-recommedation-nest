import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Playlist from "./entities/playlist.entity";
import { Repository } from "typeorm";
import CreatePlaylistDto from "./dtos/create-playlist.dto";

@Injectable()
export default class PlaylistService {
    constructor(
        @InjectRepository(Playlist) private readonly playlistRepo: Repository<Playlist>,
    ) {}

    async create(userId: number, dto: CreatePlaylistDto)  {
        const savedData = await this.playlistRepo.save({
            ...dto,
            user: {
                id: userId
            }
        });

        return savedData;
    }
};