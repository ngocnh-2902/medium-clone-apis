import type {HttpStatus} from "@nestjs/common";
import {PaginateResult} from "@app/common/interfaces/paginate.interface";

export type ResponseMessage = string

export enum ResponseStatus {
    Error = 'error',
    Success = 'success'
}

export interface HttpErrorResponse {
    path: string,
    status: ResponseStatus.Error
    message: ResponseMessage
    error: string
    timestamp: string
}

export interface HttpSuccessResponse<T> {
    path: string,
    status: ResponseStatus.Success
    message: ResponseMessage
    result: T | PaginateResult<T>
    context?: any
}

export interface SuccessResponseOptions {
    status?: HttpStatus
    message?: ResponseMessage
    useTransform?: boolean
    usePaginate?: boolean
}