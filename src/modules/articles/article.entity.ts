import { ApiProperty } from '@nestjs/swagger';
import {
    Entity,
    Column
} from 'typeorm';
import {BaseEntity} from '@app/shared/base.entity';

@Entity('articles')
export class Article extends BaseEntity {
    @ApiProperty({ description: 'Article Title' })
    @Column()
    title: string;

    @ApiProperty({ description: 'Article Slug' })
    @Column()
    slug: string;

    @ApiProperty({ description: 'Article Sapo' })
    @Column()
    excerpt: string;

    @ApiProperty({ description: 'Article Content' })
    @Column()
    content: string;

    @ApiProperty({ description: 'Article Author' })
    @Column({ name: 'author_id' })
    authorId: number;

    @ApiProperty({ description: 'Article Status' })
    @Column()
    status: string;

    @ApiProperty({ description: 'Article Published Date' })
    @Column({ name: 'published_at', type: 'timestamp', nullable: true })
    publishedAt: Date;

    @ApiProperty({ description: 'Article Deleted Date' })
    @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt: Date;
}
