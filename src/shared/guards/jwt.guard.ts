import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass()
        ])

        if(isPublic)
            return true;

        // const request = context.switchToHttp().getRequest();

        const ctx = context.switchToHttp();
        const req = ctx.getRequest();
        
        const token = this.getToken(req);

        if(!token) {
            throw new UnauthorizedException("Invalid token");
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET
            });

            const user = await this.userService.getUserById(payload.sub);

            if(!user) {
                throw new UnauthorizedException("Invalid token");
            }

            req.user = user;
        } catch(err) {
            throw new UnauthorizedException("Invalid token");
        }

        return true;
    }

    private getToken(request: Request): string {
        const authHeader = request.headers.authorization;
        if(!authHeader) {
            throw new UnauthorizedException("Invalid token");
        }

        if(authHeader.startsWith('Bearer ')) {
            return authHeader.substring(7);
        }

        throw new UnauthorizedException("Invalid token");
    }
}