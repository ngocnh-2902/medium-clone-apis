import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import {UserProfileRepository} from "@module/user-profile/repositories/user-profile.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "@module/users/user.module";
import {UserProfile} from "@module/user-profile/entities/user-profile.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserProfile]),
    UserModule
  ],
  controllers: [UserProfileController],
  providers: [UserProfileService, UserProfileRepository],
  exports: [UserProfileService],
})
export class ProfileModule {}
