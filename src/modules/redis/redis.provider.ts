import {Provider} from '@nestjs/common';
import Redis from 'ioredis';
import {ConfigService} from "@nestjs/config";
import {REDIS_CLIENT} from './redis.constant';

export type RedisClient = Redis;

export const redisProvider: Provider = {
    useFactory: (configService: ConfigService): RedisClient => {
        return new Redis({...configService.get('redis')});
    },
    provide: REDIS_CLIENT,
    inject: [ConfigService]
};