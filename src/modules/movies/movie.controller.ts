import { HttpService } from "@nestjs/axios";
import { Controller, Get, Req } from "@nestjs/common";
import { Public } from "src/shared/decorators/public.recorator";

@Controller('/movies')
export class MovieController {
    constructor(private readonly httpService: HttpService) { 
    }

    @Public()
    @Get('/trending')
    async getTrendingMovie() {
        return this.httpService.get('/trending/movie')
    }
}