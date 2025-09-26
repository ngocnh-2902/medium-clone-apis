import { Reflector } from '@nestjs/core'
import { SetMetadata, type HttpStatus } from '@nestjs/common'
import { RESPONSE_CONSTANT } from "@app/common/constants/response.constant";
import { SuccessResponseOptions } from '@app/common/interfaces/response.interface'

const reflector = new Reflector()

export const getSuccessResponseOptions = (target: any): SuccessResponseOptions => ({
    message: reflector.get<string>(RESPONSE_CONSTANT.METADATA_HTTP.SUCCESS_MESSAGE, target),
    status: reflector.get<HttpStatus>(RESPONSE_CONSTANT.METADATA_HTTP.SUCCESS_CODE, target),
    useTransform: reflector.get<boolean>(RESPONSE_CONSTANT.METADATA_HTTP.RESPONSE_TRANSFORM, target),
    usePaginate: reflector.get<boolean>(RESPONSE_CONSTANT.METADATA_HTTP.RESPONSE_PAGINATE, target)
})

export type SuccessResponseDecoratorOptions = Omit<SuccessResponseOptions, 'useTransform'>

export function SuccessResponse(input: string | SuccessResponseDecoratorOptions): MethodDecorator {
    const options: SuccessResponseDecoratorOptions = typeof input === 'string' ? { message: input } : input
    return (_, __, descriptor: PropertyDescriptor) => {
        SetMetadata(RESPONSE_CONSTANT.METADATA_HTTP.RESPONSE_TRANSFORM, true)(descriptor.value)
        if (options.status) {
            SetMetadata(RESPONSE_CONSTANT.METADATA_HTTP.SUCCESS_CODE, options.status)(descriptor.value)
        }
        if (options.message) {
            SetMetadata(RESPONSE_CONSTANT.METADATA_HTTP.SUCCESS_MESSAGE, options.message)(descriptor.value)
        }
        if (options.usePaginate) {
            SetMetadata(RESPONSE_CONSTANT.METADATA_HTTP.RESPONSE_PAGINATE, true)(descriptor.value)
        }
        return descriptor
    }
}