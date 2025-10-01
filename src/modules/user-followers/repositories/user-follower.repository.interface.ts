import { UserFollower } from '@module/user-followers/entities/user-follower.entity';
import {FollowDto} from "@module/user-followers/dto/follow.dto";

export interface IUserFollowerRepository {
    follow(follower: number, following: number): Promise<boolean>;
    unfollow(follower: number, following: number): Promise<void>;
    isFollowing(follower: number, following: number): Promise<boolean>;
    getFollowers(userId: number): Promise<UserFollower[] | []>;
    getFollowings(userId: number): Promise<UserFollower[] | []>;
    create(follow: FollowDto): Promise<UserFollower>;
    delete(id: number): Promise<void>;
    save(article: UserFollower): Promise<UserFollower>;
}