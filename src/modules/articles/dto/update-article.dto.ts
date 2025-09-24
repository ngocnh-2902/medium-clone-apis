import {ApiProperty, PartialType} from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';
import {IsDate, IsNotEmpty, IsNumber, IsString, MaxLength} from "class-validator";

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
    @ApiProperty({description: 'Article title'})
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    title: string;

    @ApiProperty({description: 'Article Sapo'})
    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    excerpt: string;

    @ApiProperty({description: 'Article content'})
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({description: 'Article status'})
    @IsString()
    @IsNotEmpty()
    status: string;

    @ApiProperty({description: 'Article punlished date'})
    @IsDate()
    publishedAt: Date;
}
