import { Injectable } from '@nestjs/common';
import {ArticleFavoriteRepository} from "@module/article-favorites/repositories/article-favorites.repository";

@Injectable()
export class ArticleFavoritesService {
  constructor(private readonly articleFavoriteRepository: ArticleFavoriteRepository) {}

  async favoriteArticle(userId: number, articleId: number) {
    const alreadyFav = await this.articleFavoriteRepository.isFavorited(userId, articleId);

    if (!alreadyFav) {
      return this.articleFavoriteRepository.add(userId, articleId);
    }

    return { message: 'Already favorited' };
  }

  async unfavoriteArticle(userId: number, articleId: number) {
    await this.articleFavoriteRepository.remove(userId, articleId);

    return { message: 'Unfavorited successfully' };
  }

  async listFavorites(userId: number) {
    return this.articleFavoriteRepository.getFavorites(userId);
  }
}
