import { Controller, Query, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import {ApiBearerAuth, ApiProperty, ApiQuery, ApiTags} from "@nestjs/swagger";

import { CommentService } from '@module/comments/comment.service';
import { CreateCommentDto } from '@module/comments/dto/create-comment.dto';
import { UpdateCommentDto } from '@module/comments/dto/update-comment.dto';
import { Comment } from '@module/comments/entities/comment.entity';
import {GetUser} from "@app/common/decorators/get-user.decorator";

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiProperty({description: 'Create a new comment'})
  @ApiBearerAuth()
  @Post(':articleId/comments/create')
  create(
      @Req() req: Request,
      @Body() createCommentDto: CreateCommentDto,
      @Param('articleId') articleId: number,
      @GetUser() user: any
  ): Promise<Comment | null> {
    createCommentDto.articleId = articleId;
    createCommentDto.authorId = user.id;
    createCommentDto.agent = req.headers['user-agent'] || '';

    return this.commentService.create(createCommentDto);
  }

  @ApiProperty({description: 'Get all comments'})
  @ApiBearerAuth()
  @ApiQuery({ name: 'parentId', required: false, description: 'Filter by parent comment id' })
  @Get(':articleId/comments')
  getCommentByArticle(
      @Param('articleId') articleId: number,
      @Query('parentId') parentId?: number,
      @Query('page') page: number = 1,
      @Query('per_page') per_page: number = 10,
  ): Promise<Comment[] | []> {
    console.log(parentId);
    return this.commentService.getCommentByArticle(articleId, page, per_page, parentId);
  }

  @ApiProperty({description: 'Create a new comment'})
  @ApiBearerAuth()
  @Post(':articleId/comments/:commentId/reply')
  reply(
      @Req() req: Request,
      @Body() createCommentDto: CreateCommentDto,
      @Param('articleId') articleId: number,
      @Param('commentId') parentId: number,
      @GetUser() user: any
  ): Promise<Comment | null> {
    createCommentDto.articleId = articleId;
    createCommentDto.authorId = user.id;
    createCommentDto.parentId = parentId;
    createCommentDto.agent = req.headers['user-agent'] || '';

    return this.commentService.create(createCommentDto);
  }

  @ApiProperty({description: 'Update comment'})
  @ApiBearerAuth()
  @Patch(':articleId/comments/:id')
  update(@Param('articleId') articleId: number, @Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(articleId, id, updateCommentDto);
  }

  @ApiProperty({description: 'Delete comment'})
  @ApiBearerAuth()
  @Delete(':articleId/comments/:id')
  delete(@Param('id') id: number) {
    return this.commentService.remove(id);
  }
}
