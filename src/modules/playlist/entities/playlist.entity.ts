import User from "@/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import PlaylistItem from "./playlist-item.entity";

export enum PlayListAccessibility {
    'PUBLIC' = 'public',
    'PRIVATE' = 'private',
};

@Entity({ name: "playlist" })
export default class Playlist {
    @PrimaryGeneratedColumn()
    id: number;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(type => User, { onDelete: 'CASCADE' })
    user: User;

    name: string;

    description: string;

    @Column({
        type: 'enum',
        enum: PlayListAccessibility,
        default: PlayListAccessibility.PUBLIC
    })
    accessibility: PlayListAccessibility

    @OneToMany(type => PlaylistItem, item => item.playlist)
    items: PlaylistItem[];

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt: Date;
    
    @UpdateDateColumn({type: 'timestamp', name: 'updated_at'})
    updatedAt: Date;
};