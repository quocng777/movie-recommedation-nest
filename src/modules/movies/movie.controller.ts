import { HttpService } from "@nestjs/axios";
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Req, Res } from "@nestjs/common";
import { Public } from "src/shared/decorators/public.recorator";
import { HttpClient } from "src/shared/http/http-client/http-client";
import { TmdbMovieDto } from "src/shared/tmdb/dtos/tmdb-movie.dto";
import { TmdbPageResponse } from "src/shared/tmdb/dtos/tmdb-page.dto";
import { extractPaginationFromTmdbResponse } from "src/shared/tmdb/helpers/extract-pagination";
import MovieService from "./movie.service";
import { UserDto } from "../user/dto/user.dto";
import { ResponseMessage } from "@/shared/decorators/response-message.decorator";

@Controller('/movies')
export class MovieController {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly movieService: MovieService,
    ) {}

    @Public()
    @Get('/trending')
    async getTrendingMovie() {
        const res = await this.httpClient.get<TmdbPageResponse<TmdbMovieDto>>({url: ''});
        return {
            data: res.results,
            pagination: extractPaginationFromTmdbResponse(res)
        };
    }

    @Get('/liked')
    async getLikedMovies(@Req() req) {
        const user = req.user as UserDto;
        return this.movieService.findLikedMoviesByUserId(user.id);
    }

    @Post('/liked')
    @HttpCode(HttpStatus.CREATED)
    async addLikedMovie(@Req() req, @Body() body: Record<string, any>) {
        const { movieId } = body;
        const user = req.user as UserDto;

        return this.movieService.addLikedMovie(user.id, movieId);
    }

    @Delete('/liked')
    @HttpCode(HttpStatus.OK)
    async deleteLikedMovie(@Req() req, @Body() body: Record<string, any> ) {
        const {movieId} = body;
        const user = req.user as UserDto;

        return this.movieService.removeLikedMovie(user.id, movieId);
    }

    @Get('/watch-later')
    async getWatchLaterList(@Req() req) {
        const user = req.user as UserDto;
        return this.movieService.findAllWatchLater(user.id);
    }

    @Post('/watch-later')
    @HttpCode(HttpStatus.CREATED)
    async addMovieToWatchLater(@Req() req, @Body() body: Record<string, any>) {
        const { movieId } = body;
        const user = req.user as UserDto;

        return this.movieService.addMovieToWatchLater(user.id, movieId);
    }

    @Delete('/watch-later')
    @HttpCode(HttpStatus.OK)
    async deleteMovieFromWatchLater(@Req() req, @Body() body: Record<string, any> ) {
        const {movieId} = body;
        const user = req.user as UserDto;

        return this.movieService.removeFromWatchLater(user.id, movieId);
    }
};