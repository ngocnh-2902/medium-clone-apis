import {IsString, MaxLength, IsNotEmpty, IsNumber, IsDate} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateArticleDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    authorId: number;

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

    @ApiProperty({description: 'Article Content'})
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({description: 'Article status'})
    @IsString()
    @IsNotEmpty()
    status: string;

    @ApiProperty({description: 'Article published date'})
    @IsDate()
    publishedAt: Date;
}
