import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {ArticleService} from '@module/articles/article.service';
import {CreateArticleDto} from '@module/articles/dto/create-article.dto';
import {UpdateArticleDto} from '@module/articles/dto/update-article.dto';
import {ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {Article} from "@module/articles/entities/article.entity";
import {User} from "@module/users/user.entity";
import {GetUser} from "@app/common/decorators/get-user.decorator";

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
    getArticles(
        @Param('page') page: number = 1,
        @Param('per_page') per_page: number = 10,
    ) {
        return this.articleService.getArticles(page, per_page);
    }

    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiBearerAuth()
    @Get('related-articles')
    getRelatedArticles(
        @Param('page') page: number = 1,
        @Param('per_page') per_page: number = 10,
    ) {
        return this.articleService.getRelatedArticles(page, per_page);
    }

    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiBearerAuth()
    @Post('create')
    create(@Body() createArticleDto: CreateArticleDto, @GetUser() user: User) {
        createArticleDto.authorId = user.id;
        return this.articleService.create(createArticleDto);
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
