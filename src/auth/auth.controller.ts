import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import CreateUserDto from "./dto/create-user.dto";
import { AuthService } from "./auth.service";

@Controller('/auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('/register')
    @UsePipes(new ValidationPipe())
    async register(@Body() dto: CreateUserDto) {
        return this.authService.registerUser(dto);
    }
}