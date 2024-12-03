import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import CreateUserDto from "src/auth/dto/create-user.dto";
import { UserDto } from "./dto/user.dto";
import * as bcrypt from "bcrypt";
import { plainToInstance } from "class-transformer";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>
    ) {}

    async save (dto: CreateUserDto): Promise<UserDto> {
        const {
            username,
            email,
            password,
            fullName
        } = dto;

        const usernameDuplicated = await this.userRepo.count({where: {username}});
        if (!!usernameDuplicated) {
            throw new BadRequestException('Username duplicated');
        }

        const emailDuplicated = await this.userRepo.count({where: {email}});
        if (!!emailDuplicated) {
            throw new BadRequestException('Email duplicated');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
            username,
            email,
            password: hashedPassword,
            fullName
        } as User;

        const savedUser = await this.userRepo.save(user);

        return plainToInstance(UserDto, savedUser);
    }
}