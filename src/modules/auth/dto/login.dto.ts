import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

import {USER_CONSTANTS} from "../../users/user.constant";

export class LoginDto {
    @ApiProperty({
        description: 'Email of user',
        example: 'abc@xyz.com',
    })
    @IsEmail()
    @MaxLength(USER_CONSTANTS.VALIDATION.MAX_EMAIL_LENGTH)
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({
        description: 'Password of user',
        example: 'Pass#123',
    })
    @MinLength(USER_CONSTANTS.VALIDATION.MIN_PASSWORD_LENGTH, {
        message: 'password too short',
    })
    @MaxLength(USER_CONSTANTS.VALIDATION.MAX_PASSWORD_LENGTH, {
        message: 'password too long',
    })
    @Matches(USER_CONSTANTS.VALIDATION.EMAIL_REGEX, {
        message: 'password too weak',
    })
    @IsNotEmpty()
    readonly password: string;
}