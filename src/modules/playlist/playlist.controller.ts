import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UsePipes, ValidationPipe } from "@nestjs/common";
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
    async getMyPlaylist(@Req() req) {
        const user = req.user as UserDto;

        return this.playlistService.getPlaylist(user.id);
    }


};