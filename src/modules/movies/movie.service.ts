import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import LikedMovie from "./entities/liked-movie.entity";
import { Repository } from "typeorm";
import { PaginationConfig, SortDirection } from "@/shared/constants/pagination";
import PaginationResponse from "@/shared/types/pagination-response";
import TmdbService from "../tmdb/tmdb.service";

export interface MovieQueryOptions {
    page?: number;
    limit?: number;
    keywords?: string;
    sortBy?: string;

};

@Injectable()
export default class MovieService {
    constructor(
        @InjectRepository(LikedMovie) private readonly likedMovieRepo: Repository<LikedMovie>,
        private readonly tmdbService: TmdbService
    ) {}

    // async findLikedMoviesByUserId(userId: number, options?: MovieQueryOptions): Promise<PaginationResponse> {
    //     const {page = 0, limit = PaginationConfig.ELEMENTS_PER_PAGE, keywords = ''} = options ?? {};

    //     const likedMovieIds = await this.likedMovieRepo.findAndCount({
    //         where: {
    //             user: {id: userId},
    //         },
    //         skip: page * limit,
    //         take: limit,
    //         order: {
    //             createdAt: SortDirection.DESC
    //         },
    //     });

    //     const data = likedMovieIds[0].map((movie) => movie.movieId);

    //     return {
    //         data,
    //         pagination: {
    //             totalPages: Math.ceil(likedMovieIds[1] / limit),
    //             totalRecords: likedMovieIds[1],
    //             currentPage: page
    //         }
    //     };
    // }

    async findLikedMoviesByUserId(userId: number) {
        const likedMovieIds = await this.likedMovieRepo.findAndCount({
            where: {
                user: {id: userId},
            },
            order: {
                createdAt: SortDirection.DESC
            },
        });

        const data = likedMovieIds[0].map((movie) => movie.movieId);

        return data;
    }

    async addLikedMovie(userId: number, movieId: number) {
        const movie = await this.tmdbService.getMovieById(movieId);

        if(!movie) {
            throw new NotFoundException(`Not found movie`);
        };

        const likedMovie = await this.likedMovieRepo.findOneBy({
            user: {id: userId},
            movieId
        });

        if(likedMovie) {
            throw new BadRequestException('Liked this movie before');
        }

        const savedData = await this.likedMovieRepo.save({
            user: {
                id: userId
            },
            movieId
        });

        return movieId;
    }

    async removeLikedMovie(userId: number, movieId: number) {

        const affected = (await this.likedMovieRepo.delete({user: {id: userId}, movieId})).affected;
        if(affected < 1) {
            throw new NotFoundException('Not found movie');
        }

        return affected;
    }
};