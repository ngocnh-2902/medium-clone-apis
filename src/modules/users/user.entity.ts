import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
    Entity,
    Column
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import {BaseEntity} from '../shared/base.entity';

@Entity('users')
export class User extends BaseEntity {
    @ApiProperty({ description: 'Email address', example: 'abc@xyz.com' })
    @Column({ unique: true })
    @IsEmail()
    email: string;

    @ApiHideProperty()
    @Column()
    @Exclude({ toPlainOnly: true })
    password: string;
}