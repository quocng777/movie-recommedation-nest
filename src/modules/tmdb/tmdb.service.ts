import { HttpClient } from "@/shared/http/http-client/http-client";
import { TmdbMovieDto } from "@/shared/tmdb/dtos/tmdb-movie.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class TmdbService {
    constructor(
        private readonly httpClient: HttpClient,
    ) {}

    async getMovieById(movieId: number) {
        return this.httpClient.get<TmdbMovieDto>({url: `/movie/${movieId}`});
    }
};