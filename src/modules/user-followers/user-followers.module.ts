import { Module } from '@nestjs/common';
import { UserFollowersService } from './user-followers.service';
import { UserFollowersController } from './user-followers.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserFollower } from "@module/user-followers/entities/user-follower.entity";
import { UserFollowerRepository } from "@module/user-followers/repositories/user-follower.repository";
import { UserModule } from "@module/users/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserFollower]),
    UserModule
  ],
  controllers: [UserFollowersController],
  providers: [UserFollowersService, UserFollowerRepository],
  exports: [UserFollowersService, UserFollowerRepository],
})
export class UserFollowersModule {}
