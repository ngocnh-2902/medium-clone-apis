import { User } from '../entities/user.entity';

export interface IUserRepository {
    find(userId: number): Promise<User | null>;
    findByEmail(usernameOrEmail: string): Promise<User | null>;
    create(user: Partial<User>): Promise<User>;
    save(user: User): Promise<User>;
}