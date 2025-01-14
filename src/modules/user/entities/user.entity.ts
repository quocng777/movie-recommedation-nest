import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum AuthProvider {
    "LOCAL" = 'local',
    "GOOGLE" = 'google' 
};

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    @Exclude()
    password: string;

    @Column({name: 'fullname'})
    fullname: string;

    @Column({name: 'activated', default: false})
    activated: boolean;

    @Column({default: false})
    disabled: boolean;

    @Column({
        type: 'enum',
        enum: AuthProvider,
        default: AuthProvider.LOCAL
    })
    provider: AuthProvider

    @Column({nullable: true})
    picture: string


    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', name: 'updated_at'})
    updatedAt: Date;
};