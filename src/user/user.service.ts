import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import CreateUserDto from "src/auth/dto/create-user.dto";
import { UserDto } from "./dto/user.dto";
import * as bcrypt from "bcrypt";
import { plainToInstance } from "class-transformer";
import { CustomBadReRequestException } from "src/shared/exceptions/custom-bad-request-exception";
import { customCode } from "src/shared/constants/custom-code";

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
            fullname,
            picture
        } = dto;

        const usernameDuplicated = await this.userRepo.count({where: {username}});
        if (!!usernameDuplicated) {
            throw new CustomBadReRequestException(customCode.USERNAME_DUPLICATED);
        }

        const emailDuplicated = await this.userRepo.count({where: {email}});
        if (!!emailDuplicated) {
            throw new CustomBadReRequestException(customCode.EMAIL_DUPLICATED);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
            username,
            email,
            password: hashedPassword,
            fullname,
            picture
        } as User;

        const savedUser = await this.userRepo.save(user);

        return plainToInstance(UserDto, savedUser);
    }

    async getUserByEmail (email: string) {
        const savedUser = await this.userRepo.findOne({where: {email}});

        return plainToInstance(UserDto, savedUser);
    }
}