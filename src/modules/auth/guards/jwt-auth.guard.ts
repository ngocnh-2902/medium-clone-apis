import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { REQUEST_USER_KEY } from '../auth.constant';
import { RedisService } from '../../redis/redis.service';
import {IUser} from "../../users/user.interface";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly redisService: RedisService,
        private reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.getToken(request);
        if (!token) {
            throw new UnauthorizedException('Authorization token is required');
        }

        try {
            const payload = await this.jwtService.verifyAsync<IUser>(
                token,
                {secret: this.configService.get<string>('jwt.secret', '')},
            );

            console.log(payload);

            const isValidToken = await this.redisService.validate(
                `user-${payload.id}`,
                payload.tokenId,
            );

            if (!isValidToken) {
                throw new UnauthorizedException('Authorization token is not valid');
            }

            request[REQUEST_USER_KEY] = payload;
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }

        return true;
    }

    private getToken(request: Request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}