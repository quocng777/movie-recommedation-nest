import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import CreateUserDto from "./dto/create-user.dto";
import { AuthService } from "./auth.service";
import { ResponseMessage } from "src/shared/decorators/response-message.decorator";
import LoginDto from "./dto/login.dto";
import { Public } from "src/shared/decorators/public.recorator";

@Controller('/auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('/register')
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage("User created successfully")
    @Public()
    async register(@Body() dto: CreateUserDto) {
        return this.authService.registerUser(dto);
    }

    @Post('google')
    @HttpCode(HttpStatus.OK)
    @Public()
    async googleLogin(@Body() body: { token: string }) {
        const { token } = body;
        const user = await this.authService.validateGoogleLoginViaAccessToken(token);
        return user;
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @Public()
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
}