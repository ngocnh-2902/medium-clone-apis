import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateUserProfileDto } from '@module/user-profile/dto/create-profile.dto';
import { UpdateUserProfileDto } from '@module/user-profile/dto/update-profile.dto';
import {I18nService} from "nestjs-i18n";
import {UserProfileRepository} from "@module/user-profile/repositories/user-profile.repository";
import {UserRepository} from "@module/users/repositories/user.repository";

@Injectable()
export class UserProfileService {
  constructor(
      private readonly userProfileRepo: UserProfileRepository,
      private readonly userRepo: UserRepository,
      private readonly i18n: I18nService
  ) {}

  async getProfile(userId: number) {
    const profile = await this.userProfileRepo.find(userId);

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async updateProfile(userId: number, updateUserProfileDto: UpdateUserProfileDto) {
    let profile = await this.userProfileRepo.find(userId);

    if (!profile) {
      const user = await this.userRepo.find(userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

        profile = await this.userProfileRepo.create({
            ...updateUserProfileDto,
            user: user,
        } as CreateUserProfileDto);
    }

    return this.userProfileRepo.create(profile);
  }
}
