import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const getTypeOrmModuleOptions = (): TypeOrmModuleOptions => {
    return {
        synchronize: true,
        type: 'postgres',
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: Number.parseInt(process.env.DB_PORT),
        migrationsTableName: '_migrations',
        migrations: ['./src/migration/*.ts'],
    }
}