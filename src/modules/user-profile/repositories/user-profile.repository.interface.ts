import {UserProfile} from "@module/user-profile/entities/user-profile.entity";
import {UpdateUserProfileDto} from "@module/user-profile/dto/update-profile.dto";

export interface IUserProfileRepository {
    find(userId: number): Promise<UserProfile>;
    create(createProfileDto: Partial<UserProfile>): Promise<UserProfile>;
    update(updateProfileDto: UpdateUserProfileDto): Promise<UserProfile>;
}