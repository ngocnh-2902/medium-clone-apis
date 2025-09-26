import { PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from '@module/articles/dto/create-article.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) { }
