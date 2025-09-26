import {
    ArgumentsHost,
    ExceptionFilter,
    Catch,
    HttpStatus,
    HttpException,
} from '@nestjs/common';
import {I18nService} from "nestjs-i18n";
import { Response, Request } from 'express';
import _isString from 'lodash/isString';

import {ResponseStatus, HttpErrorResponse} from '@app/common/interfaces/response.interface';

type ExceptionResponse =
    | string
    | {
    message: string
    error?: any
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly i18n: I18nService) {}

    async catch(exception: any, host: ArgumentsHost): Promise<void> {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const request = context.getRequest<Request>();
        const timestamp = new Date().toISOString();
        const lang = request.headers['accept-language']?.toString().split(',')[0] || 'en';

        if (exception instanceof HttpException) {
            const errorInfo = exception.getResponse() as ExceptionResponse;

            response.status(exception.getStatus()).send({
                path: request.url,
                status: ResponseStatus.Error,
                message: _isString(errorInfo) ? errorInfo : await this.i18n.t(`errors.${(errorInfo as any).message}`, {lang}),
                error: _isString(errorInfo) ? null : (errorInfo as any).error,
                timestamp
            } as HttpErrorResponse);
        } else {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                path: request.url,
                status: ResponseStatus.Error,
                message: exception instanceof Error ? exception.message : String(exception),
                error: 'Internal Server Error',
                timestamp
            } as HttpErrorResponse);
        }
    }
}