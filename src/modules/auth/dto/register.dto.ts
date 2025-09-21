import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import {USER_CONSTANTS} from "../../users/user.constant";

export class RegisterDto {
    @ApiProperty({
        example: 'abc@xyz.com',
        description: 'Email of user',
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

    @ApiProperty({
        description: 'Repeat same value as in password field',
        example: 'Pass#123',
    })
    @IsNotEmpty()
    readonly passwordConfirm: string;
}