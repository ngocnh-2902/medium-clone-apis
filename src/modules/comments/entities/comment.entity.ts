import {ApiProperty} from "@nestjs/swagger";
import {BeforeInsert, Column, Entity, ManyToOne, JoinColumn} from "typeorm";
import {BaseEntity} from "@module/shared/base.entity";
import {Article} from "@module/articles/entities/article.entity";
import { User } from "@app/modules/users/entities/user.entity";

@Entity('comments')
export class Comment extends BaseEntity {
    @ApiProperty({ description: 'Comment Article ID' })
    @Column({ name: 'article_id', type: 'bigint' })
    articleId: number;

    @ApiProperty({ description: 'Comment Parent ID' })
    @Column({ name: 'parent_id', type: 'bigint', nullable: true })
    parentId: number;

    @ApiProperty({ description: 'Comment content' })
    @Column({ name: 'content' })
    content: string;

    @ApiProperty({ description: 'Comment Author' })
    @Column({ name: 'author_id', type: 'bigint' })
    authorId: number;

    @ApiProperty({ description: 'Comment User Agent' })
    @Column({ name: 'user_agent', nullable: true })
    agent: string;

    @ApiProperty({ description: 'Comment Status' })
    @Column({ name: 'status' })
    status: string;

    @ApiProperty({ description: 'Comment Deleted Date' })
    @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt: Date;

    @BeforeInsert()
    async beforeInsert() {
        if (!this.status) {
            this.status = 'active';
        }
    }

    @ManyToOne(() => Article, (article) => article.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'article_id' })
    article: Article;

    @ManyToOne(() => User, (user) => user.comments, { eager: false })
    @JoinColumn({ name: 'author_id' })
    author: User;
}
