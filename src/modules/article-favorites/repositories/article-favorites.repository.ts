import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {IArticleFavoriteRepository} from "@module/article-favorites/repositories/articleFavorites.repository.interface";
import {ArticleFavorite} from "@module/article-favorites/entities/article-favorite.entity";

@Injectable()
export class ArticleFavoriteRepository implements IArticleFavoriteRepository {
    constructor(
        @InjectRepository(ArticleFavorite) private readonly repo: Repository<ArticleFavorite>,
    ) {}

    async add(userId: number, articleId: number): Promise<ArticleFavorite | null> {
        const favorite = this.repo.create({ userId, articleId });
        return this.repo.save(favorite);
    }

    async remove(userId: number, articleId: number): Promise<boolean> {
        const result = await this.repo.delete({ userId, articleId });
        return !!result.affected && result.affected > 0;
    }

    async isFavorited(userId: number, articleId: number): Promise<boolean> {
        const count = await this.repo.count({ where: { userId, articleId } });
        return count > 0;
    }

    async getFavorites(userId: number): Promise<ArticleFavorite[] | []> {
        return this.repo.find({ where: { userId } });
    }
}