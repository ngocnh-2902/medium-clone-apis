import {ApiProperty} from '@nestjs/swagger';
import {
    Entity,
    Column, BeforeInsert, BeforeUpdate, OneToMany, JoinColumn, Index
} from 'typeorm';
import {BaseEntity} from '@module/shared/base.entity';
import {toSlug} from '@app/common/utils/string.util';
import {Comment} from '@module/comments/entities/comment.entity';
import {ARTICLE_CONSTANTS} from "@module/articles/article.constant";
import {IsNotEmpty, IsString, IsEnum} from "class-validator";
import {ArticleFavorite} from "@module/article-favorites/entities/article-favorite.entity";

@Entity('articles')
export class Article extends BaseEntity {
    @ApiProperty({description: 'Article Title'})
    @Column({name: 'title', length: ARTICLE_CONSTANTS.VALIDATION.TITLE_MAX_LENGTH})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({description: 'Article Slug'})
    @Column({name: 'slug', length: ARTICLE_CONSTANTS.VALIDATION.SLUG_MAX_LENGTH})
    @IsString()
    @IsNotEmpty()
    @Index({ unique: true })
    slug: string;

    @ApiProperty({description: 'Article Sapo'})
    @Column({name: 'excerpt', length: ARTICLE_CONSTANTS.VALIDATION.EXCERPT_MAX_LENGTH})
    @IsString()
    @IsNotEmpty()
    excerpt: string;

    @ApiProperty({description: 'Article Content'})
    @Column({name: 'content', type: 'text'})
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({description: 'Article Author'})
    @Column({name: 'author_id', type: 'bigint'})
    @IsString()
    @IsNotEmpty()
    authorId: number;

    @ApiProperty({description: 'Article Status'})
    @Column({name: 'status', type: 'enum', enum: ARTICLE_CONSTANTS.STATUS.STATE, default: ARTICLE_CONSTANTS.STATUS.DRAFT})
    @IsEnum(ARTICLE_CONSTANTS.STATUS.STATE)
    @IsNotEmpty()
    status: string;

    @ApiProperty({description: 'Article Published Date'})
    @Column({name: 'published_at', type: 'timestamp', nullable: true})
    publishedAt: Date;

    @ApiProperty({description: 'Article Deleted Date'})
    @Column({name: 'deleted_at', type: 'timestamp', nullable: true})
    deletedAt: Date;

    @BeforeInsert()
    async beforeInsert() {
        this.slug = toSlug(this.title)

        if (this.status === 'publish') {
            this.publishedAt = this.publishedAt ? this.publishedAt : new Date();
        }
    }

    @BeforeUpdate()
    async beforeUpdate() {
        this.updatedAt = new Date();
        this.slug = toSlug(this.title);

        if (!this.publishedAt && this.status === 'publish') {
            this.publishedAt = this.publishedAt ? this.publishedAt : new Date();
        }
    }

    @OneToMany(() => Comment, (comment) => comment.article)
    @JoinColumn({name: 'id', referencedColumnName: 'article_id'})
    comments: Comment[];

    @OneToMany(() => ArticleFavorite, (af) => af.article)
    favorites: ArticleFavorite[];
}
