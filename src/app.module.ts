import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmModuleOptions } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => {
        return getTypeOrmModuleOptions();
      }
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
