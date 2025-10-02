import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@module/users/entities/user.entity';
import { UserFollower } from '@module/user-followers/entities/user-follower.entity';

import { IUserFollowerRepository } from './user-follower.repository.interface';

@Injectable()
export class UserFollowerRepository implements IUserFollowerRepository {
    constructor(
        @InjectRepository(UserFollower)
        private readonly repo: Repository<UserFollower>,
    ) {}

    async follow(followerId: number, followingId: number): Promise<boolean> {
        const entity = this.repo.create({ followerId, followingId });
        return this.repo.save(entity).then(() => true).catch(() => false);
    }

    async unfollow(followerId: number, followingId: number): Promise<void> {
        await this.repo.delete({
            follower: { id: followerId },
            following: { id: followingId },
        });
    }

    async isFollowing(followerId: number, followingId: number): Promise<boolean> {
        const existing = await this.repo.findOne({
            where: {
                follower: { id: followerId },
                following: { id: followingId },
            },
        });
        return !!existing;
    }

    async getFollowers(userId: number): Promise<UserFollower[] | []> {
        return this.repo.find({
            where: { following: { id: userId } },
            relations: ['follower'],
        });
    }

    async getFollowings(userId: number): Promise<UserFollower[] | []> {
        return this.repo.find({
            where: { follower: { id: userId } },
            relations: ['following'],
        });
    }
}