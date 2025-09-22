import { User } from './user.entity';
import {CreateUserDto} from "./dto/create-user.dto";

export interface IUserRepository {
    find(userId: number): Promise<User | null>;
    findByEmail(usernameOrEmail: string): Promise<User | null>;
    create(user: CreateUserDto): Promise<User>;
    save(user: User): Promise<User>;
}