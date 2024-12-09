import { HttpService } from "@nestjs/axios";
import { Controller, Get, Req } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import { Public } from "src/shared/decorators/public.recorator";
import { HttpClient } from "src/shared/http/http-client/http-client";
import { TmdbMovieDto } from "src/shared/tmdb/dtos/tmdb-movie.dto";
import { TmdbPageResponse } from "src/shared/tmdb/dtos/tmdb-page.dto";
import { extractPaginationFromTmdbResponse } from "src/shared/tmdb/helpers/extract-pagination";

@Controller('/movies')
export class MovieController {
    constructor(private readonly httpClient: HttpClient) { 
    }

    @Public()
    @Get('/trending')
    async getTrendingMovie() {
        const res = await this.httpClient.get<TmdbPageResponse<TmdbMovieDto>>({url: ''});
        return {
            data: res.results,
            pagination: extractPaginationFromTmdbResponse(res)
        };
    }
}