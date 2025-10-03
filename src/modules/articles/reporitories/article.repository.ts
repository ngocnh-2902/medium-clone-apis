import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {IArticleRepository} from "@module/articles/reporitories/article.repository.interface";
import { Article } from '@module/articles/entities/article.entity';
import {CreateArticleDto} from "@module/articles/dto/create-article.dto";
import {paginate, PaginateOptions, PaginateResult} from "@app/common/interfaces/paginate.interface";
import {ArticlePaginateDTO} from "@module/articles/dto/paginate-article.dto";

@Injectable()
export class ArticleRepository implements IArticleRepository {
    constructor(
        @InjectRepository(Article) private readonly repo: Repository<Article>,
    ) {}

    async find(id: number): Promise<Article | null> {
        return this.repo.findOne({ where: { id } });
    }

    async getArticles(articlePaginateDto: ArticlePaginateDTO, paginateOptions: PaginateOptions): Promise<PaginateResult<Article>> {
        const { keyword, status, lang } = articlePaginateDto;

        const qb = this.repo.createQueryBuilder('article')
            .leftJoinAndSelect('article.author', 'author');

        if (keyword) {
            qb.andWhere(
                '(article.title LIKE :keyword OR article.description LIKE :keyword)',
                { keyword: `%${keyword}%` },
            );
        }

        if (status) {
            qb.andWhere('article.status = :status', { status });
        }

        // if (lang) {
        //     qb.andWhere('article.lang = :lang', { lang });
        // }

        return paginate(qb, paginateOptions);
    }

    async getRelatedArticles(page: number, per_page: number): Promise<Article[] | []> {
        return this.repo.find({
            skip: (page - 1) * per_page,
            take: per_page,
            order: { createdAt: 'DESC' },
        });
    }

    async create(authorId: number, article: CreateArticleDto): Promise<Article> {
        return this.repo.create({authorId, ...article});
    }

    async delete(id: number): Promise<void> {
        await this.repo.delete(id);
    }

    async save(article: Article): Promise<Article> {
        return this.repo.save(article);
    }
}