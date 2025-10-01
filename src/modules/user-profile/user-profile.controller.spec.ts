import { Test, TestingModule } from '@nestjs/testing';
import { UserProfileController } from '@module/user-profile/user-profile.controller';
import { UserProfileService } from '@module/user-profile/user-profile.service';

describe('UserProfileController', () => {
  let controller: UserProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserProfileController],
      providers: [UserProfileService],
    }).compile();

    controller = module.get<UserProfileController>(UserProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
