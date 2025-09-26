import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import type { FastifyRequest, FastifyReply } from 'fastify'
import { Observable, map } from 'rxjs';

import { getSuccessResponseOptions } from '@app/common/decorators/response.decorator';
import { HttpSuccessResponse, ResponseStatus } from '@app/common/interfaces/response.interface';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, T | HttpSuccessResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const reponseOptions = getSuccessResponseOptions(context.getHandler());

        if (!reponseOptions.useTransform) {
            return next.handle();
        }

        const request = context.switchToHttp().getRequest<FastifyRequest>();
        const response = context.switchToHttp().getResponse<FastifyReply>();

        return next.handle().pipe(
            map((data: any) => {
                if (reponseOptions.status) {
                    response.status(reponseOptions.status)
                }

                const responseBody: HttpSuccessResponse<T> = {
                    path: request.url,
                    status: ResponseStatus.Success,
                    message: reponseOptions.message ?? 'Success',
                    context: {
                        url: request.url,
                        method: request.method,
                        route_params: request.params ?? {},
                        query_params: request.locals.validatedQueryParams ?? {},
                        is_authenticated: request.locals.isAuthenticated,
                        is_unauthenticated: request.locals.isUnauthenticated
                    },
                    result: !reponseOptions.usePaginate
                        ? data
                        : {
                            data: data.documents,
                            pagination: {
                                total: data.total,
                                current_page: data.page,
                                per_page: data.perPage,
                                total_page: data.totalPage
                            }
                        }
                }

                return responseBody;
            }),
        );
    }
}
