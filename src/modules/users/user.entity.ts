import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
    Entity,
    Column,
    BeforeInsert
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import {BaseEntity} from '../shared/base.entity';

const saltRounds = 10;

@Entity('user')
export class User extends BaseEntity {
    @Column()
    username: string;

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
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
}