import { NotFoundException, Injectable } from '@nestjs/common';
import { UserRepository} from "./user.repository";
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async getMe(userId: number): Promise<User> {
        const user = await this.userRepository.find(userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
}