import { IsIn, IsInt, IsOptional, IsNotEmpty, IsDateString, IsString } from 'class-validator'
import { Transform } from 'class-transformer'
import { unknownToNumber } from '@app/common/transformers/value.transformer'

export const enum BooleanNumberValue {
    False = 0,
    True = 1
}

export class DateQueryDTO {
    @IsDateString()
    @IsOptional()
    date?: string
}

export class KeywordQueryDTO {
    @IsString()
    @IsOptional()
    keyword?: string
}

export class BooleanQueryDTO {
    @IsIn([BooleanNumberValue.True, BooleanNumberValue.False])
    @IsInt()
    @IsOptional()
    @Transform(({ value }) => unknownToNumber(value))
    boolean?: BooleanNumberValue.True | BooleanNumberValue.False
}