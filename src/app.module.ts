import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import appConfig from './config/app.config';
import dbConfig from './config/database.config'
import jwtConfig from './config/jwt.config'
import swaggerConfig from './config/swagger.config'

import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ArticleModule } from './modules/articles/article.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, jwtConfig, dbConfig, swaggerConfig],
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    ArticleModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
