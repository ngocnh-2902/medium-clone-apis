import {Article} from '@module/articles/entities/article.entity';
import {CreateArticleDto} from "@module/articles/dto/create-article.dto";
import {PaginateResult, PaginateOptions} from "@app/common/interfaces/paginate.interface";
import {ArticlePaginateDTO} from "@module/articles/dto/paginate-article.dto";

export interface IArticleRepository {
    find(id: number): Promise<Article | null>;

    getArticles(articlePaginateDto: ArticlePaginateDTO, paginateOptions: PaginateOptions): Promise<PaginateResult<Article>>;

    getRelatedArticles(page: number, per_page: number): Promise<Article[] | []>;

    create(authorId: number, article: CreateArticleDto): Promise<Article>;

    delete(id: number): Promise<void>;

    save(article: Article): Promise<Article>;
}