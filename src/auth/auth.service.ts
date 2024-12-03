import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import CreateUserDto from "./dto/create-user.dto";
import { UserDto } from "src/user/dto/user.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ) {}

    async registerUser(dto: CreateUserDto): Promise<UserDto> {
        return this.userService.save(dto);
    }
}