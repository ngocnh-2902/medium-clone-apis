import {ApiProperty} from '@nestjs/swagger';
import {
    Entity,
    Column, BeforeInsert, BeforeUpdate
} from 'typeorm';
import { BaseEntity } from '@module/shared/base.entity';
import { toSlug } from '@app/common/utils/string.util';

@Entity('articles')
export class Article extends BaseEntity {
    @ApiProperty({ description: 'Article Title' })
    @Column({ name: 'title' })
    title: string;

    @ApiProperty({ description: 'Article Slug' })
    @Column({ name: 'slug', unique: true })
    slug: string;

    @ApiProperty({ description: 'Article Sapo' })
    @Column({ name: 'excerpt', type: 'text' })
    excerpt: string;

    @ApiProperty({ description: 'Article Content' })
    @Column({ name: 'content', type: 'text' })
    content: string;

    @ApiProperty({ description: 'Article Author' })
    @Column({ name: 'author_id', type: 'bigint' })
    authorId: number;

    @ApiProperty({ description: 'Article Status' })
    @Column({ name: 'status' })
    status: string;

    @ApiProperty({ description: 'Article Published Date' })
    @Column({ name: 'published_at', type: 'timestamp', nullable: true })
    publishedAt: Date;

    @ApiProperty({ description: 'Article Deleted Date' })
    @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
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
}
