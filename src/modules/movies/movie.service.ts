import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import LikedMovie from "./entities/liked-movie.entity";
import { In, Repository } from "typeorm";
import { PaginationConfig, SortDirection } from "@/shared/constants/pagination";
import PaginationResponse from "@/shared/types/pagination-response";
import TmdbService from "../tmdb/tmdb.service";
import WatchLater from "./entities/watch-later.entity";
import Rating from "./entities/rating.entity";

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
        private readonly tmdbService: TmdbService,
        @InjectRepository(WatchLater) private readonly watchLaterRepo: Repository<WatchLater>,
        @InjectRepository(Rating) private readonly ratingRepo: Repository<Rating>,
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

    async findAllWatchLater(userId: number) {
        const watchList = await this.watchLaterRepo.find({
            where: {
                user: {id: userId},
            },
            order: {
                createdAt: SortDirection.DESC
            },
        });
        const data = watchList.map((movie) => movie.movieId);
        return data;
    }

    async addMovieToWatchLater(userId: number, movieId: number) {
        const movie = await this.tmdbService.getMovieById(movieId);

        if(!movie) {
            throw new NotFoundException(`Not found movie`);
        };

        const watchLater = await this.watchLaterRepo.findOneBy({
            user: {id: userId},
            movieId
        });

        if(watchLater) {
            throw new BadRequestException('Added this movie before');
        }

        const savedData = await this.watchLaterRepo.save({
            user: {
                id: userId
            },
            movieId
        });

        return movieId;
    }

    async removeFromWatchLater(userId: number, movieId: number) {
        const affected = (await this.watchLaterRepo.delete({user: {id: userId}, movieId})).affected;
        if(affected < 1) {
            throw new NotFoundException('Not found movie');
        }

        return affected;
    }

    async addRating(userId: number, movieId: number, score: number) {
      const movie = await this.tmdbService.getMovieById(movieId);
      if(!movie) {
        throw new NotFoundException('movie not found');
      }

      await this.ratingRepo.delete({
        movieId,
        user: {
          id: userId,
        }
      })
      
      const saved = await this.ratingRepo.save({
        user: {
          id: userId,
        },
        movieId,
        score,
      });

      return {
        id: saved.id,
        movieId: saved.movieId,
        score: saved.score,
      };
    }

    async deleteRating(userId: number, movieId: number) {
      await this.ratingRepo.delete({
        movieId,
        user: {
          id: userId,
        },
      });

      return true;
    }
    
    async getRating(userId: number, movieId: number) {
      const data = await this.ratingRepo.findOne({
        where: {
          movieId,
          user: {
            id: userId,
          }
        }
      });

      return data 
        ? {
          id: data.id,
          movieId: data.movieId,
          score: data.score,
        } 
        : null;
    }
};