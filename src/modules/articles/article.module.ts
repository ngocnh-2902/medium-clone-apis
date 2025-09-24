import {forwardRef, Module} from '@nestjs/common';
import { ArticleService } from '@module/articles/article.service';
import { ArticleController } from '@module/articles/article.controller';
import { ArticleRepository } from "@module/articles/reporitories/article.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "@module/auth/auth.module";
import {Article} from "@module/articles/entities/article.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    forwardRef(() => AuthModule)
  ],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRepository],
  exports: [ArticleService],
})
export class ArticleModule {}
