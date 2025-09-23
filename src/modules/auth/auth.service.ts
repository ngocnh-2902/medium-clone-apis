import {BadRequestException, Injectable, Inject} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {randomUUID} from 'crypto';
import {BcryptService} from './bcrypt.service';
import {LoginDto} from './dto/login.dto';
import {User} from "../users/user.entity";
import {IUser} from "../users/user.interface";
import { RegisterDto } from './dto/register.dto';
import {UserRepository} from "../users/user.repository";
import {RedisService} from "../redis/redis.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly bcryptService: BcryptService,
        private readonly redisService: RedisService,
        private readonly configService: ConfigService,
        private readonly userRepository: UserRepository
    ) {}

    async login(loginDto: LoginDto): Promise<{ accessToken: string, refreshToken: string }> {
        const { email, password } = loginDto;
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new BadRequestException('Invalid email');
        }

        const isPasswordMatch = await this.bcryptService.compare(
            password,
            user.password,
        );

        if (!isPasswordMatch) {
            throw new BadRequestException('Invalid password');
        }

        return await this.generateAccessToken(user);
    }

    async logout(userId: number): Promise<void> {
        return await this.redisService.delete(`user-${userId}`);
    }

    async register(registerDto: RegisterDto): Promise<User> {
        const { email, password } = registerDto;
        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new BadRequestException('Email or Username already exists');
        }

        const hashedPassword = await this.bcryptService.hash(password);
        const user = await this.userRepository.create({
            email,
            password: hashedPassword,
        });

        return await this.userRepository.save(user);
    }

    private async generateAccessToken(
        user: Partial<User>,
    ): Promise<{ accessToken: string, refreshToken: string }> {
        const tokenId = randomUUID();

        await this.redisService.insert(`user-${user.id}`, tokenId);

        const accessToken = await this.jwtService.signAsync(
            {
                id: user.id,
                email: user.email,
                tokenId: tokenId,
            } as IUser,
            {
                secret: this.configService.get('jwt.secret'),
                expiresIn: this.configService.get('jwt.signOptions.expiresIn'),
            },
        );

        const refreshToken = await this.jwtService.signAsync(
            {
                id: user.id,
                email: user.email,
                tokenId: tokenId,
            } as IUser,
            {
                secret: this.configService.get('jwt.refresh'),
                expiresIn: this.configService.get('jwt.refreshTokenTtl'),
            }
        );

        return { accessToken, refreshToken };
    }
}
