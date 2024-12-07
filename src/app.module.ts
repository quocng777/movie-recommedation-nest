import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmModuleOptions } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseTransformInterceptor } from './shared/interceptors/response-transform.interceptor';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './shared/guards/jwt.guard';

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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: 8 * 60 * 1000
          }
        }
      },
      global: true
    })
    ,
    UserModule,
    AuthModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ]
})
export class AppModule {}
