import {ApiProperty, PartialType} from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';
import {IsNotEmpty, IsNumber, IsString, MaxLength} from "class-validator";

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    @IsNumber()
    @IsNotEmpty()
    articleId: number;

    @IsNumber()
    @IsNotEmpty()
    authorId: number;

    @ApiProperty({description: 'Comment content'})
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    content: string;

    @ApiProperty({description: 'Comment status'})
    @IsString()
    @IsNotEmpty()
    status: string;
}
