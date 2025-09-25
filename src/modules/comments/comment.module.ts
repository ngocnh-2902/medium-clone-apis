import {forwardRef, Module} from '@nestjs/common';
import { CommentService } from '@module/comments/comment.service';
import { CommentController } from '@module/comments/comment.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Comment} from "@module/comments/entities/comment.entity";
import {CommentRepository} from "@module/comments/repositories/comment.repository";
import {ArticleModule} from "@module/articles/article.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    forwardRef(() => ArticleModule)
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
  exports: [CommentService]
})
export class CommentModule {}
