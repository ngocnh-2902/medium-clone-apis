import { Injectable, NestMiddleware } from '@nestjs/common';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { NextFunction } from 'express';

@Injectable()
export class LanguageMiddleware implements NestMiddleware {
    use(req: FastifyRequest, _: FastifyReply, next: NextFunction) {
        req.lang = req.headers['accept-language']?.toString().split(',')[0] || 'en';
        next();
    }
}
