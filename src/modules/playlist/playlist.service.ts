import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Playlist from "./entities/playlist.entity";
import { Repository } from "typeorm";
import CreatePlaylistDto from "./dtos/create-playlist.dto";
import { SortDirection } from "@/shared/constants/pagination";
import PlaylistDto from "./dtos/playlist.dto";
import { plainToInstance } from "class-transformer";
import TmdbService from "../tmdb/tmdb.service";
import PlaylistItem from "./entities/playlist-item.entity";

export type PlaylistQueryOption = {
    movieId?: number,
};

@Injectable()
export default class PlaylistService {
    constructor(
        @InjectRepository(Playlist) private readonly playlistRepo: Repository<Playlist>,
        private readonly tmdbService: TmdbService,
        @InjectRepository(PlaylistItem) private readonly playlistItemRepo: Repository<PlaylistItem>
    ) {}

    async create(userId: number, dto: CreatePlaylistDto)  {
        const savedData = await this.playlistRepo.save({
            ...dto,
            user: {
                id: userId
            }
        });

        return plainToInstance(PlaylistDto, savedData);
    }

    async getPlaylist(userId: number, option?: PlaylistQueryOption) {
        const { movieId } = option ?? {};
        
        const data = await this.playlistRepo.find({
            where: {
                user: {id: userId},
                ...(
                    movieId 
                    ? {
                        items: {
                            movieId: movieId
                        }
                    }
                    : {}
                )
            },
            order: {
                updatedAt: SortDirection.DESC
            }
        });

        return plainToInstance(PlaylistDto, data);
    }

    async addMovie(userId: number, playlistId: number, movieId: number) {
        const playlist = await this.playlistRepo.findOne({
            where: {
                id: playlistId,
                user: {id: userId}
            },
            relations: ['items'],
        });

        if(!playlist) {
            throw new NotFoundException();
        }

        const idx = playlist.items.findIndex((item) => item.movieId === movieId);
        if(idx !== -1) {
            throw new BadRequestException('This movie added before');
        }

        const movie = await this.tmdbService.getMovieById(movieId);

        if(!movie) {
            throw new NotFoundException('not found movie');
        }

        const data = await this.playlistItemRepo.save({
            movieId,
            playlist: {
                id: playlistId
            }
        });

        return {
            movieId,
            playlistId: playlistId,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    }
};