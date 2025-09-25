import { Comment } from "@module/comments/entities/comment.entity";
import { CreateCommentDto } from "@module/comments/dto/create-comment.dto";

export interface ICommentRepository {
    find(articleId: number, id: number): Promise<Comment | null>;

    getComments(articleId: number, page: number, per_page: number): Promise<Comment[] | []>;

    create(comment: CreateCommentDto): Promise<Comment>;

    delete(id: number): Promise<void>;

    save(comment: Comment): Promise<Comment>;
}