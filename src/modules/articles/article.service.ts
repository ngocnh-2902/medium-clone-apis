import {Injectable} from '@nestjs/common';
import {CreateArticleDto} from '@module/articles/dto/create-article.dto';
import {UpdateArticleDto} from '@module/articles/dto/update-article.dto';
import {ArticleRepository} from "@module/articles/reporitories/article.repository";
import {Article} from "@module/articles/entities/article.entity";
import {PaginateOptions, PaginateResult} from "@app/common/interfaces/paginate.interface";
import {ArticlePaginateDTO} from "@module/articles/dto/paginate-article.dto";
import {User} from "@module/users/entities/user.entity";

@Injectable()
export class ArticleService {
    constructor(private readonly articleRepository: ArticleRepository) {
    }

    async getArticle(id: number): Promise<Article | null> {
        return this.articleRepository.find(id);
    }

    async getArticles(articlePaginateDto: ArticlePaginateDTO, paginateOptions: PaginateOptions): Promise<PaginateResult<Article>> {
        return this.articleRepository.getArticles(articlePaginateDto, paginateOptions);
    }

    async getRelatedArticles(page: number, per_page: number): Promise<Article[] | []> {
        return this.articleRepository.getRelatedArticles(page, per_page);
    }

    async create(authorId: number, article: CreateArticleDto): Promise<Article | null> {
        const newArticle = await this.articleRepository.create(authorId, article);
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
