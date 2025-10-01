import {Injectable, BadRequestException, NotFoundException} from '@nestjs/common';
import {I18nService} from "nestjs-i18n";

import {UserRepository} from '@module/users/repositories/user.repository';
import {UserFollowerRepository} from '@module/user-followers/repositories/user-follower.repository';
import {FollowDto} from '@module/user-followers/dto/follow.dto';

@Injectable()
export class UserFollowersService {
    constructor(
        private readonly userFollowerRepo: UserFollowerRepository,
        private readonly userRepo: UserRepository,
        private readonly i18n: I18nService
    ) {}

    async follow(userId: number, dto: FollowDto) {
        if (userId === dto.followingId) {
            throw new BadRequestException(this.i18n.t('user-followers.ERRORS.CANNOT_FOLLOW_YOURSELF'));
        }

        console.log(userId, dto);

        const follower = await this.userRepo.find(userId);
        const following = await this.userRepo.find(dto.followingId);

        if (!follower) {
            throw new NotFoundException(this.i18n.t('user-followers.ERRORS.USER_NOT_FOUND'));
        }

        if (!following) {
            throw new NotFoundException(this.i18n.t('user-followers.ERRORS.FOLLOWING_NOT_FOUND'));
        }

        const already = await this.userFollowerRepo.isFollowing(userId, dto.followingId);
        if (already) {
            throw new BadRequestException(this.i18n.t('user-followers.ERRORS.ALREADY_FOLLOWING'));
        }

        return this.userFollowerRepo.follow(follower.id, following.id);
    }

    async unfollow(userId: number, followingId: number) {
        return this.userFollowerRepo.unfollow(userId, followingId);
    }

    async getFollowers(userId: number) {
        return this.userFollowerRepo.getFollowers(userId);
    }

    async getFollowings(userId: number) {
        return this.userFollowerRepo.getFollowings(userId);
    }
}
