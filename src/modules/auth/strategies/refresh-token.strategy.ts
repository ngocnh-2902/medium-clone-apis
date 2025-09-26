import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { FastifyRequest } from 'fastify';
import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('jwt.refresh', ''),
            passReqToCallback: true,
        });
    }

    validate(req: FastifyRequest, payload: any) {
        const authHeader = req.headers['authorization'];
        const refreshToken = authHeader
            ? authHeader.replace('Bearer', '').trim()
            : undefined;

        return { ...payload, refreshToken };
    }
}