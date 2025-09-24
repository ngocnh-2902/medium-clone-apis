import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { I18nModule, AcceptLanguageResolver, QueryResolver, HeaderResolver } from 'nestjs-i18n';
import * as path from 'path';

import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';

import appConfig from '@app/config/app.config';
import dbConfig from '@app/config/database.config'
import jwtConfig from '@app/config/jwt.config'
import redisConfig from '@app/config/redis.config'
import swaggerConfig from '@app/config/swagger.config'

import { DatabaseModule } from '@module/database/database.module';
import { UserModule } from '@module/users/user.module';
import { AuthModule } from '@module/auth/auth.module';
import { BcryptService } from '@module/auth/bcrypt.service';
import { RedisService } from '@module/redis/redis.service';
import { RedisModule } from '@module/redis/redis.module';
import { JwtAuthGuard } from '@module/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, jwtConfig, dbConfig, redisConfig, swaggerConfig],
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.getOrThrow('app.lang'),
        loaderOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: true,
        },
      }),
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
      inject: [ConfigService],
    }),
    DatabaseModule,
    RedisModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    BcryptService,
    RedisService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
