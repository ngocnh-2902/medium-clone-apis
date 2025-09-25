import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {IsNull, Repository} from 'typeorm';

import {CreateCommentDto} from "@module/comments/dto/create-comment.dto";
import {Comment} from "@module/comments/entities/comment.entity";
import {ICommentRepository} from "@module/comments/repositories/comment.repository.interface";

@Injectable()
export class CommentRepository implements ICommentRepository {
    constructor(
        @InjectRepository(Comment) private readonly repo: Repository<Comment>,
    ) {}

    async find(articleId: number, id: number): Promise<Comment | null> {
        return this.repo.findOne({ where: { id, articleId } });
    }

    async getComments(articleId: number, page: number, per_page: number, parentId?: number): Promise<Comment[] | []> {
        return this.repo.find({
            where: {articleId, parentId: parentId ?? IsNull()},
            skip: (page - 1) * per_page,
            take: per_page,
            order: { createdAt: 'DESC' },
            relations: ['author', 'article' ],
        });
    }

    async create(comment: CreateCommentDto): Promise<Comment> {
        return this.repo.create(comment);
    }

    async delete(id: number): Promise<void> {
        await this.repo.delete(id);
    }

    async save(comment: Comment): Promise<Comment> {
        return this.repo.save(comment);
    }
}