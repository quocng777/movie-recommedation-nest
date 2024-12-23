
import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config as dotenvConfig } from "dotenv";
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
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    // migrationsRun: true,
};

export const dataSource = new DataSource(dataSourceOptions);