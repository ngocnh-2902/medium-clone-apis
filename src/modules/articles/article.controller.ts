import {Controller, Get, Post, Body, Patch, Param, Query, Delete} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";

import {GetUser} from "@app/common/decorators/get-user.decorator";
import {SuccessResponse} from "@app/common/decorators/response.decorator";

import {User} from "@module/users/entities/user.entity";
import {Article} from "@module/articles/entities/article.entity";
import {ArticleService} from '@module/articles/article.service';
import {CreateArticleDto} from '@module/articles/dto/create-article.dto';
import {UpdateArticleDto} from '@module/articles/dto/update-article.dto';
import {ArticlePaginateDTO} from "@module/articles/dto/paginate-article.dto";
import {PaginateOptions, PaginateResult} from "@app/common/interfaces/paginate.interface";

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {
    }

    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiOkResponse({ description: "Get Article content" })
    @ApiBearerAuth()
    @Get(':id')
    getArticle(@Param('id') id: number = 1): Promise<Article | null> {
        return this.articleService.getArticle(id);
    }

    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiOkResponse({ description: "Get latest Articles" })
    @ApiBearerAuth()
    @Get('latest')
    getArticles(@Query() query: ArticlePaginateDTO): Promise<PaginateResult<Article>> {
        const { page = 1, per_page = 10, sort = 'DESC' } = query;
        const paginateOptions: PaginateOptions = { page, perPage: per_page, sort }

        return this.articleService.getArticles(query, paginateOptions);
    }

    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiBearerAuth()
    @Get('related-articles')
    getRelatedArticles(
        @Query('page') page: number = 1,
        @Query('per_page') per_page: number = 10,
    ) {
        return this.articleService.getRelatedArticles(page, per_page);
    }

    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiBearerAuth()
    @Post('create')
    create(@Body() createArticleDto: CreateArticleDto, @GetUser() author: User) {
        return this.articleService.create(author.id, createArticleDto);
    }

    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiBearerAuth()
    @Patch('update/:id')
    update(@Param('id') id: number, @Body() updateArticleDto: UpdateArticleDto) {
        return this.articleService.update(id, updateArticleDto);
    }

    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiBearerAuth()
    @Delete('delete/:id')
    delete(@Param('id') id: number) {
        return this.articleService.delete(id);
    }
}
