import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import PlaylistService from "./playlist.service";
import { ResponseMessage } from "@/shared/decorators/response-message.decorator";
import CreatePlaylistDto from "./dtos/create-playlist.dto";
import { UserDto } from "../user/dto/user.dto";

@Controller('/playlist')
export default class PlaylistController {
    constructor(
        private readonly playlistService: PlaylistService,
    ) {}

    @ResponseMessage('created a playlist')
    @UsePipes(new ValidationPipe())
    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    async createPlaylist(@Req() req, @Body() dto: CreatePlaylistDto) {
        const user = req.user as UserDto;

        return this.playlistService.create(user.id, dto);
    }

    @Get('/')
    async getMyPlaylist(@Req() req, @Query() query) {
        const user = req.user as UserDto;

        const {
            movieId
        } = query;

        return this.playlistService.getPlaylist(user.id, {movieId});
    }

    @Post('/:id/movies')
    async addMovieToPlayList(@Req() req, @Param() param, @Body() body: Record<string, any>) {
        const {id} = param;
        const user = req.user as UserDto;
        const {movieId} = body;

        return this.playlistService.addMovie(user.id, id, movieId);
    }


};