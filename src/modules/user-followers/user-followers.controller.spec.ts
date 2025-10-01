import { Test, TestingModule } from '@nestjs/testing';
import { UserFollowersController } from './user-followers.controller';
import { UserFollowersService } from './user-followers.service';

describe('UserFollowersController', () => {
  let controller: UserFollowersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFollowersController],
      providers: [UserFollowersService],
    }).compile();

    controller = module.get<UserFollowersController>(UserFollowersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
