import {TypeOrmModule} from "@nestjs/typeorm";

import { Module } from '@nestjs/common';
import { ArticleFavoritesService } from '@module/article-favorites/article-favorites.service';
import { ArticleFavoritesController } from '@module/article-favorites/article-favorites.controller';
import {ArticleFavorite} from "@module/article-favorites/entities/article-favorite.entity";
import {ArticleFavoriteRepository} from "@module/article-favorites/repositories/article-favorites.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleFavorite])
  ],
  controllers: [ArticleFavoritesController],
  providers: [ArticleFavoritesService, ArticleFavoriteRepository],
  exports: [ArticleFavoritesService],
})
export class ArticleFavoritesModule {}
