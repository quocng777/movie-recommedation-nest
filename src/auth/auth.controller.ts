import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import CreateUserDto from "./dto/create-user.dto";
import { AuthService } from "./auth.service";
import { ResponseMessage } from "src/shared/decorators/response-message.decorator";
import { AuthGuard } from "@nestjs/passport";

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

    @Post('google')
        async googleLogin(@Body() body: { token: string }) {
            const { token } = body;
            const user = await this.authService.validateGoogleLoginViaAccessToken(token);
            return user;
  }
}