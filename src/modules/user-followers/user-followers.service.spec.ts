import { Test, TestingModule } from '@nestjs/testing';
import { UserFollowersService } from './user-followers.service';

describe('UserFollowersService', () => {
  let service: UserFollowersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFollowersService],
    }).compile();

    service = module.get<UserFollowersService>(UserFollowersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
