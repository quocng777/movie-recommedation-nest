import { config as dotenvConfig } from "dotenv";
import LikedMovie from "../modules/movies/entities/liked-movie.entity";
import User from "../modules/user/entities/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";
import WatchLater from "@/modules/movies/entities/watch-later.entity";
import Playlist from "@/modules/movies/entities/playlist.entity";
import PlaylistItem from "@/modules/movies/entities/playlist-item.entity";

dotenvConfig();

export const dataSourceOptions: DataSourceOptions = {
    synchronize: false,
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number.parseInt(process.env.DB_PORT),
    migrationsTableName: '_migrations',
    logging: true,
    entities: [User, LikedMovie, WatchLater, Playlist, PlaylistItem],
    migrations: ['../migrations/*{.ts,.js}'], //problem: when you want to run migration please change the path to 'src/migration/*{.ts,.js}''. I'm trying to fix it, but not now
    migrationsRun: false,
};

export const dataSource = new DataSource(dataSourceOptions);