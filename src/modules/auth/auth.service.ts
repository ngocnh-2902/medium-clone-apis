import {BadRequestException, Injectable, Inject} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {randomUUID} from 'crypto';
import {BcryptService} from './bcrypt.service';
import {LoginDto} from './dto/login.dto';
import {User} from "../users/entities/user.entity";
import {IUser} from "../users/interfaces/user.interface";
import { RegisterDto } from './dto/register.dto';
import {UserRepository} from "../users/repositories/user.repository";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly bcryptService: BcryptService,
        private readonly configService: ConfigService
    ) {}

    async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
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

    async register(registerDto: RegisterDto): Promise<User> {
        const { email, password } = registerDto;
        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new BadRequestException('Email or Username already exists');
        }

        const hashedPassword = await this.bcryptService.hash(password);

        return await this.userRepository.create({
            email,
            password: hashedPassword,
        });
    }

    private async generateAccessToken(
        user: Partial<User>,
    ): Promise<{ accessToken: string }> {
        const tokenId = randomUUID();

        const accessToken = await this.jwtService.signAsync(
            {
                id: user.id,
                email: user.email,
                token: tokenId,
            } as IUser,
            {
                secret: this.configService.get('jwt.secret'),
                expiresIn: this.configService.get('jwt.accessTokenTtl'),
            },
        );

        return { accessToken };
    }
}
