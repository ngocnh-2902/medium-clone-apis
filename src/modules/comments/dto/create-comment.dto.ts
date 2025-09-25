import {IsNotEmpty, IsNumber, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateCommentDto {
    @IsNumber()
    @IsNotEmpty()
    articleId: number;

    @IsNumber()
    @IsNotEmpty()
    authorId: number;

    @IsNumber()
    parentId: number;

    @ApiProperty({description: 'Comment content'})
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    content: string;

    @ApiProperty({description: 'Comment user agent'})
    @IsString()
    agent: string;

    @ApiProperty({description: 'Comment status'})
    @IsString()
    @IsNotEmpty()
    status: string;
}
