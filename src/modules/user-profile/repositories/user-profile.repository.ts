import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUserProfileRepository } from '@module/user-profile/repositories/user-profile.repository.interface';
import {UserProfile} from "@module/user-profile/entities/user-profile.entity";

@Injectable()
export class UserProfileRepository implements IUserProfileRepository {
    constructor(
        @InjectRepository(UserProfile)
        private readonly repo: Repository<any>,
    ) {}

    async find(userId: number): Promise<any> {
        return this.repo.find({ where: { userId } });
    }

    async create(createProfileDto: Partial<UserProfile>): Promise<UserProfile> {
        const userProfile = this.repo.create(createProfileDto);
        return this.repo.save(userProfile);
    }

    async update(updateProfileDto: any): Promise<UserProfile> {
        let profile = await this.repo.findOne(updateProfileDto.userId);

        if (!profile) {
            profile = this.repo.create(updateProfileDto);
        } else {
            Object.assign(profile, updateProfileDto);
        }

        return this.repo.save(profile);
    }
}