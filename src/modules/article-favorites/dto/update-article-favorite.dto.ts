import { PartialType } from '@nestjs/swagger';
import { CreateArticleFavoriteDto } from '@module/article-favorites/dto/create-article-favorite.dto';

export class UpdateArticleFavoriteDto extends PartialType(CreateArticleFavoriteDto) {}
