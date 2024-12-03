import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import CreateUserDto from "./dto/create-user.dto";
import { AuthService } from "./auth.service";
import { ResponseMessage } from "src/shared/decorators/response-message.decorator";

@Controller('/auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('/register')
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage("User created successfully")
    async register(@Body() dto: CreateUserDto) {
        return this.authService.registerUser(dto);
    }
}