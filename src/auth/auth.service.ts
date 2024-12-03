import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import CreateUserDto from "./dto/create-user.dto";
import { UserDto } from "src/user/dto/user.dto";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const GOOGLE_API_URL = 'https://www.googleapis.com/oauth2/v1/userinfo';
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        @Inject('GOOGLE_OAUTH2_CLIENT') private oAuth2Client: OAuth2Client,
    ) {}

    async registerUser(dto: CreateUserDto): Promise<UserDto> {
        return this.userService.save(dto);
    };

    async googleLogin(dto: CreateUserDto) {
        if(!dto) {
            throw new BadRequestException('google authentication is invalid');
        }

        const savedUser = await this.userService.getUserByEmail(dto.email);

        if(!savedUser) {
            return this.userService.save(dto);
        }

        return savedUser;
    }

    async validateGoogleLogin(token: string) {
        const ticket = await this.oAuth2Client.verifyIdToken({
          idToken: token,
          audience: process.env.OAUTH2_GOOGLE_CLIENT_ID,
        });
    
        const payload = ticket.getPayload();
        console.log(payload);
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

            return savedUser;

        } catch(error) {
            console.log(error);
            throw new BadRequestException('Invalid access token');
        }
    }
}