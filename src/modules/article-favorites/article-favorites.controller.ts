import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticleFavoritesService } from '@module/article-favorites/article-favorites.service';
import {ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {GetUser} from "@app/common/decorators/get-user.decorator";

@ApiTags('Article Favorites')
@Controller('article-favorites')
export class ArticleFavoritesController {
  constructor(private readonly articleFavoritesService: ArticleFavoritesService) {}

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: "Favorite a article" })
  @ApiBearerAuth()
  @Post()
  async favorite(@GetUser('id') userId: number, @Param('articleId') articleId: number) {
    return this.articleFavoritesService.favoriteArticle(userId, +articleId);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: "Unfavorite a article" })
  @ApiBearerAuth()
  @Delete()
  async unfavorite(@GetUser('id') userId: number, @Param('articleId') articleId: number) {
    return this.articleFavoritesService.unfavoriteArticle(userId, +articleId);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: "Get my favorites" })
  @ApiBearerAuth()
  @Get()
  async myFavorites(@GetUser('id') userId: number) {
    return this.articleFavoritesService.listFavorites(userId);
  }
}
