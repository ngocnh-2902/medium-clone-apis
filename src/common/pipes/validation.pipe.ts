import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import type { ValidationError } from 'class-validator'
import { plainToInstance } from 'class-transformer';

import { RULES_CONSTANT } from "@app/common/constants/rules.constant";

const collectMessages = (errors: ValidationError[]) => {
    const messages: string[] = []
    for (const error of errors) {
        if (error.constraints) {
            messages.push(...Object.values<any>(error.constraints))
        }
        if (error.children?.length) {
            messages.push(...collectMessages(error.children))
        }
    }
    return messages
}

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || RULES_CONSTANT.UNVERIFIABLE_TYPES.includes(metatype as any)) {
            return value;
        }

        const object = plainToInstance(metatype, value);
        const errors = await validate(object);

        if (errors.length > 0) {
            throw new BadRequestException(`Validation failed: ${collectMessages(errors).join('; ')}`)
        }

        return value;
    }
}
