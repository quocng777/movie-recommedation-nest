import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/modules/user/user.service";
import CreateUserDto from "./dto/create-user.dto";
import { UserDto } from "src/modules/user/dto/user.dto";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import LoginDto from "./dto/login.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Public } from "src/shared/decorators/public.recorator";

const GOOGLE_API_URL = 'https://www.googleapis.com/oauth2/v1/userinfo';
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        @Inject('GOOGLE_OAUTH2_CLIENT') private oAuth2Client: OAuth2Client,
        private jwtService: JwtService,
    ) {}

    async registerUser(dto: CreateUserDto): Promise<UserDto> {
        return this.userService.save(dto);
    };

    async validateGoogleLogin(token: string) {
        const ticket = await this.oAuth2Client.verifyIdToken({
          idToken: token,
          audience: process.env.OAUTH2_GOOGLE_CLIENT_ID,
        });
    
        const payload = ticket.getPayload();
        return payload;
      }

    async validateGoogleLoginViaAccessToken(token: string) {
        try {
            const response = await axios.get(
                GOOGLE_API_URL,
                {
                    params: {
                        access_token: token
                    }
                }
            );

            const userData = response.data;

            const user = {
                username: userData.email,
                fullname: userData.name,
                email: userData.email,
                picture: userData.picture,
                password: uuidv4(),
                activated: true,
            };

            const savedUser = await this.userService.getUserByEmail(user.email);

            if(!savedUser) {
                return this.userService.save(user);
            }

            return this.generateTokePair({sub: savedUser.id});

        } catch(error) {
            console.log(error);
            throw new BadRequestException('Invalid access token');
        }
    }

    async login(dto: LoginDto) {
        const user = await this.userService.getUserByEmail(dto.email);

        if(!user) {
            throw new NotFoundException('user not found');
        };

        const passwordsMatched = await bcrypt.compare(dto.password, user.password);

        if(!passwordsMatched) {
            throw new UnauthorizedException('credentials are not valid');
        };

        return this.generateTokePair({sub: user.id});
    }

    private generateTokePair(payload) {
        const accessToken = this.jwtService.sign(
        payload, {
            expiresIn: '8m'
        });

        const refreshToken = this.jwtService.sign(
            payload,
            {
                expiresIn: '30d'
            }
        )

        return {
            accessToken,
            refreshToken
        }
    };


}