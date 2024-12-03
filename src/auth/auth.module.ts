import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [UserModule],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {};