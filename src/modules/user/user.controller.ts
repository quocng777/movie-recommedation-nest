import { Controller, Get, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";

@Controller('/users')
export class UserController {
    constructor(private userService: UserService) { 
    }

    @Get('/me')
    async getMe(@Req() req: any) {
        const user = req.user as UserDto;

        return user;
    }
}