import { Global, Module, OnApplicationShutdown, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';

import { REDIS_CLIENT } from './redis.constant';
import { RedisService } from './redis.service';
import { redisProvider } from "./redis.provider";

@Global()
@Module({
  imports: [ConfigModule],
  providers: [redisProvider, RedisService],
  exports: [RedisService, redisProvider],
})

export class RedisModule implements OnApplicationShutdown {
  constructor(private readonly moduleRef: ModuleRef) {}

  async onApplicationShutdown(signal?: string): Promise<void> {
    return new Promise<void>((resolve) => {
      const redis = this.moduleRef.get(REDIS_CLIENT);
      redis.quit();
      redis.on('end', () => {
        resolve();
      });
    });
  }
}