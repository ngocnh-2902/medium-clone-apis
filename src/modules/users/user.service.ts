import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async getMe(userId: number): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
}