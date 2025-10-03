import { Test, TestingModule } from '@nestjs/testing';
import { ArticleFavoritesService } from '@module/article-favorites/article-favorites.service';

describe('ArticleFavoritesService', () => {
  let service: ArticleFavoritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleFavoritesService],
    }).compile();

    service = module.get<ArticleFavoritesService>(ArticleFavoritesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
