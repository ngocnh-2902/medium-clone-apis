import {Column, ManyToOne, JoinColumn, Entity, Unique} from 'typeorm';

import { BaseEntity } from '@module/shared/base.entity';
import { User } from '@module/users/entities/user.entity';
import { Article } from '@module/articles/entities/article.entity';

@Entity('article_favorites')
@Unique(['user', 'article'])
export class ArticleFavorite extends BaseEntity {
    @Column({ name: 'user_id', type: 'bigint' })
    userId: number;

    @Column({ name: 'article_id', type: 'bigint' })
    articleId: number;

    @ManyToOne(() => User, (user) => user.favorites, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Article, (article) => article.favorites, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'article_id' })
    article: Article;
}
