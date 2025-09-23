import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { IUserRepository } from './user.repository.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(User) private readonly repo: Repository<User>,
    ) {}

    async find(id: number): Promise<User | null> {
        return this.repo.findOne({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.repo.findOne({ where: [{ email: email }] });
    }

    async create(user: CreateUserDto): Promise<User> {
        return this.repo.create(user);
    }

    async save(user: User): Promise<User> {
        return this.repo.save(user);
    }
}