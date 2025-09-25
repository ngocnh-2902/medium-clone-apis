import {Injectable} from '@nestjs/common';
import {CreateArticleDto} from '@module/articles/dto/create-article.dto';
import {UpdateArticleDto} from '@module/articles/dto/update-article.dto';
import {ArticleRepository} from "@module/articles/reporitories/article.repository";
import {Article} from "@module/articles/entities/article.entity";

@Injectable()
export class ArticleService {
    constructor(private readonly articleRepository: ArticleRepository) {
    }

    async getArticle(id: number): Promise<Article | null> {
        return this.articleRepository.find(id);
    }

    async getArticles(page: number, per_page: number): Promise<Article[] | []> {
        return this.articleRepository.getArticles(page, per_page);
    }

    async getRelatedArticles(page: number, per_page: number): Promise<Article[] | []> {
        return this.articleRepository.getRelatedArticles(page, per_page);
    }

    async create(article: CreateArticleDto): Promise<Article | null> {
        const newArticle = await this.articleRepository.create(article);
        return this.articleRepository.save(newArticle);
    }

    async update(id: number, article: UpdateArticleDto): Promise<Article | null> {
        const existingArticle = await this.articleRepository.find(id);
        if (!existingArticle) {
            throw new Error('Article not found');
        }
        Object.assign(existingArticle, article);
        return this.articleRepository.save(existingArticle);
    }

    async delete(id: number): Promise<void> {
        const existingArticle = await this.articleRepository.find(id);
        if (!existingArticle) {
            throw new Error('Article not found');
        }
        return this.articleRepository.delete(id);
    }
}
