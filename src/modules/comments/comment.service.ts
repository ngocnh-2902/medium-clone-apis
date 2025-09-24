import {Injectable} from '@nestjs/common';
import {CreateCommentDto} from '@module/comments/dto/create-comment.dto';
import {UpdateCommentDto} from '@module/comments/dto/update-comment.dto';
import {CommentRepository} from "@module/comments/repositories/comment.repository";
import {Comment} from "@module/comments/entities/comment.entity";

@Injectable()
export class CommentService {
    constructor(private readonly commentRepository: CommentRepository) {
    }

    async create(createCommentDto: CreateCommentDto): Promise<Comment | null> {
        const comment = await this.commentRepository.create(createCommentDto);

        return this.commentRepository.save(comment);
    }

    async getCommentByArticle(articleId: number, page: number, per_page: number, parentId?: number): Promise<Comment[] | []> {
        return this.commentRepository.getComments(articleId, page, per_page, parentId);
    }

    async update(articleId, id, updateCommentDto: UpdateCommentDto): Promise<Comment> {
        const comment = await this.commentRepository.find(articleId, id);

        if (!comment) {
            throw new Error('Comment not found');
        }

        comment.content = updateCommentDto.content || comment.content;

        return this.commentRepository.save(comment);
    }

    async remove(id: number): Promise<void> {
        return this.commentRepository.delete(id);
    }
}
