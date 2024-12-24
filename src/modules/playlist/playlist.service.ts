import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Playlist from "./entities/playlist.entity";
import { Repository } from "typeorm";
import CreatePlaylistDto from "./dtos/create-playlist.dto";
import { SortDirection } from "@/shared/constants/pagination";
import PlaylistDto from "./dtos/playlist.dto";
import { plainToInstance } from "class-transformer";

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

    async getPlaylist(userId: number) {
        const data = await this.playlistRepo.find({
            where: {
                user: {id: userId}
            },
            order: {
                updatedAt: SortDirection.DESC
            }
        });

        return plainToInstance(PlaylistDto, data);
    }
};