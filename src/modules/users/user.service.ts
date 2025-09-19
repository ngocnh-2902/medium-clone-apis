import { NotFoundException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from "./dto/create-user.dto";
import { UserRepository} from "./repositories/user.repository";
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async login(usernameOrEmail: string, password: string) {
        const user = await this.userRepository.findByEmail(usernameOrEmail);
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        return {
            id: user.id,
            email: user.email
        };
    }

    async register(data: CreateUserDto) {
        const existing = await this.userRepository.findByEmail(data.email);
        if (existing) throw new Error('Email or Username already exists');

        const user = await this.userRepository.create(data);
        return this.userRepository.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }

    async getMe(userId: number): Promise<User> {
        const user = await this.userRepository.find(userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
}