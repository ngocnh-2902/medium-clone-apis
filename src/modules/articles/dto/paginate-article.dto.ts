import { IntersectionType } from '@nestjs/mapped-types'
import {IsNumber, IsString, IsOptional} from 'class-validator'
import { KeywordQueryDTO } from '@app/common/dto/query.dto'
import {ApiProperty} from "@nestjs/swagger";

export class ArticlePaginateDTO extends IntersectionType(KeywordQueryDTO) {
    @ApiProperty({description: 'Article status [draft, publish, trash]', default: 'publish'})
    @IsString()
    @IsOptional()
    status?: string

    @ApiProperty({description: 'Article language [en, vi]', default: 'en'})
    @IsString()
    @IsOptional()
    lang: string

    @ApiProperty({description: 'Article page number', default: 1})
    @IsNumber()
    @IsOptional()
    page: number

    @ApiProperty({description: 'Article per page', default: 10})
    @IsNumber()
    @IsOptional()
    per_page: number

    @ApiProperty({description: 'Article sort by', default: 'desc'})
    @IsNumber()
    @IsOptional()
    sort: string
}