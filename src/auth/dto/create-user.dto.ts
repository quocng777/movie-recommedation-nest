import { Transform } from "class-transformer";
import { IsEmail, IsString, Max, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(5)
    @MaxLength(10)
    @Transform(({value}) => (typeof value === 'string') ? value.trim() : '')
    username: string;

    @IsEmail()
    @Transform(({value}) => (typeof value === 'string')  ? value.toLowerCase() : '')
    email: string;

    @IsString()
    @MinLength(5)
    @MaxLength(16)
    password: string;

    @MinLength(1)
    @MaxLength(40)
    fullName: string;
};

export default CreateUserDto;