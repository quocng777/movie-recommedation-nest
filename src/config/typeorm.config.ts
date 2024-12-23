import { config as dotenvConfig } from "dotenv";
import LikedMovie from "../modules/movies/entities/liked-movie.entity";
import User from "../modules/user/entities/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";

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
    entities: [User, LikedMovie],
    migrations: ['src/migrations/*{.js,.ts}'],
    // migrationsRun: true,
};

export const dataSource = new DataSource(dataSourceOptions);