import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
    Entity,
    Column,
    BeforeInsert
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import {BaseEntity} from '../../shared/base.entity';
import { USER_CONSTANTS } from '../user.constant';

@Entity('user')
export class User extends BaseEntity {
    @ApiProperty({ description: 'Email address', example: 'abc@xyz.com' })
    @Column({ unique: true })
    @IsEmail()
    email: string;

    @ApiHideProperty()
    @Column()
    @Exclude({ toPlainOnly: true })
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, USER_CONSTANTS.PASSWORD_SALT_ROUNDS);
    }
}