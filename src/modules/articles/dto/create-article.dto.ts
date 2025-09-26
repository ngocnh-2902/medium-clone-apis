import {IsString, MaxLength, IsNotEmpty, IsNumber, IsDate} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {ARTICLE_CONSTANTS} from "@module/articles/article.constant";

export class CreateArticleDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(ARTICLE_CONSTANTS.VALIDATION.ID_MAX_LENGTH)
    authorId: number;

    @ApiProperty({description: 'Article title'})
    @IsString()
    @IsNotEmpty()
    @MaxLength(ARTICLE_CONSTANTS.VALIDATION.TITLE_MAX_LENGTH)
    title: string;

    @ApiProperty({description: 'Article Sapo'})
    @IsString()
    @IsNotEmpty()
    @MaxLength(ARTICLE_CONSTANTS.VALIDATION.EXCERPT_MAX_LENGTH)
    excerpt: string;

    @ApiProperty({description: 'Article Content'})
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({description: 'Article status [draft, publish, trash]'})
    @IsNumber()
    @IsNotEmpty()
    status: string;

    @ApiProperty({description: 'Article published date'})
    @IsDate()
    publishedAt: Date;
}
