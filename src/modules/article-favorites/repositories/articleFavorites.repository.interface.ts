import {ArticleFavorite} from "@module/article-favorites/entities/article-favorite.entity";

export interface IArticleFavoriteRepository {
    add(userId: number, articleId: number): Promise<ArticleFavorite | null>;
    remove(userId: number, articleId: number): Promise<boolean>;
    isFavorited(userId: number, articleId: number): Promise<boolean>;
    getFavorites(userId: number): Promise<ArticleFavorite[] | []>;
}