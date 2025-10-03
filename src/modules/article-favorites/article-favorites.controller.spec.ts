import { Test, TestingModule } from '@nestjs/testing';
import { ArticleFavoritesController } from '@module/article-favorites/article-favorites.controller';
import { ArticleFavoritesService } from '@module/article-favorites/article-favorites.service';

describe('ArticleFavoritesController', () => {
  let controller: ArticleFavoritesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleFavoritesController],
      providers: [ArticleFavoritesService],
    }).compile();

    controller = module.get<ArticleFavoritesController>(ArticleFavoritesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
