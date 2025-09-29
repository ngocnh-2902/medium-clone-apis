import { SelectQueryBuilder, ObjectLiteral } from 'typeorm';

import { APP_CONSTANT } from "@app/common/constants/app.constant";

export interface PaginateOptions {
    page?: number;
    perPage?: number;
    sort?: string;
}

export interface PaginateResult<T> {
    data: T[];
    pagination: {
        total: number;
        page: number;
        perPage: number;
        totalPage: number;
    }
}

export async function paginate<T extends ObjectLiteral>(
    qb: SelectQueryBuilder<T>,
    options: PaginateOptions = {},
): Promise<PaginateResult<T>> {
    const page = options.page && options.page > 0 ? options.page : APP_CONSTANT.DEFAULT_PAGE;
    const perPage = options.perPage && options.perPage > 0 && options.perPage < APP_CONSTANT.MAX_ITEM_PER_PAGE ? options.perPage : APP_CONSTANT.MAX_ITEM_PER_PAGE;

    if (options.sort) {
        const [field, order] = options.sort.split(':');
        qb.addOrderBy(field, (order?.toUpperCase() as 'ASC' | 'DESC') || 'DESC');
    }

    const [data, total] = await qb
        .skip((page - 1) * perPage)
        .take(perPage)
        .getManyAndCount();

    console.log(data);

    return {
        data,
        pagination: {
            total,
            page,
            perPage,
            totalPage: Math.ceil(total / perPage) || 1,
        }
    } as PaginateResult<T>;
}