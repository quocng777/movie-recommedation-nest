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
import { MailerService } from "@nestjs-modules/mailer";
import { MailSubjects } from "@/shared/constants/mail.constant";
import { use } from "passport";
import { TokenTypes } from "@/shared/constants/token-type";
import { getActivationAccountEmailTemplate } from "@/shared/helpers/email-template";

const GOOGLE_API_URL = 'https://www.googleapis.com/oauth2/v1/userinfo';
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        @Inject('GOOGLE_OAUTH2_CLIENT') private oAuth2Client: OAuth2Client,
        private jwtService: JwtService,
        private readonly mailerService: MailerService,
    ) {}

    async registerUser(dto: CreateUserDto) {
        const data = {
            ...dto,
            activated: false,
        }
        
        const user = await this.userService.save(data);

        this.sendActivateEmail(user);
        return this.generateTokePair({sub: user.id});
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

        const {
          password,
          ...result
        } = user;

        return {

        }
    }

    async verifyActivateToken(token: string) {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_SECRET
        });

        const {
            sub,
            type,
        } = payload;

        const user = await this.userService.getUserById(sub);

        if(!user) {
            throw new NotFoundException('user not found');
        };

        if(user.activated) {
            throw new BadRequestException('user is verified');
        };

        if(type !== TokenTypes.ACCOUNT_ACTIVATION) {
            throw new BadRequestException('not valid token');
        };

        user.activated = true;
        const savedData = this.userService.save(user);

        return savedData;
    }

    generateTokePair(payload) {
        const accessToken = this.jwtService.sign(
        payload, {
            expiresIn: '2d'
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

    private async sendActivateEmail(user: UserDto) {

        const verifyAccountToken = this.jwtService.sign(
            {
                sub: user.id,
                type: TokenTypes.ACCOUNT_ACTIVATION,
            }, {
                expiresIn: '10m'
            });
        
        this
            .mailerService
            .sendMail({
                to: user.email,
                subject: MailSubjects.ACTIVATE_ACCOUNT,
                html: getActivationAccountEmailTemplate({username: user.fullname, activateLink: `http://localhost:5173/activate-account?token=${verifyAccountToken}`}),
            })
    }
}