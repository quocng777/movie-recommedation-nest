import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserDto {
    @Expose()
    id: number;

    @Expose()
    email: string;

    @Expose()
    username: string;

    @Expose()
    fullName: string;

    @Expose()
    activated: boolean;

    @Expose()
    disabled: boolean;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}