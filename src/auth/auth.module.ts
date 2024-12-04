import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { OAuth2Client } from "google-auth-library";

@Module({
    imports: [UserModule],
    providers: [AuthService, {
        provide: 'GOOGLE_OAUTH2_CLIENT',
        useFactory: () => {
            return new OAuth2Client(process.env. OAUTH2_GOOGLE_CLIENT_ID, process.env.OAUTH2_GOOGLE_CLIENT_SECRET);
        }
    }],
    controllers: [AuthController]
})
export class AuthModule {};