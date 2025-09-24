import {Column, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';

export class BaseEntity {
    @ApiProperty({
        description: 'Identifier',
        type: 'number',
        example: '123',
    })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({description: 'Created date'})
    @Column({name: 'created_at'})
    createdAt: Date;

    @ApiProperty({description: 'Updated date'})
    @Column({name: 'updated_at'})
    updatedAt: Date;
}