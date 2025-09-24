import {Article} from '@module/articles/entities/article.entity';
import {CreateArticleDto} from "@module/articles/dto/create-article.dto";

export interface IArticleRepository {
    find(id: number): Promise<Article | null>;

    getArticles(page: number, per_page: number): Promise<Article[] | []>;

    getRelatedArticles(page: number, per_page: number): Promise<Article[] | []>;

    create(article: CreateArticleDto): Promise<Article>;

    delete(id: number): Promise<void>;

    save(article: Article): Promise<Article>;
}