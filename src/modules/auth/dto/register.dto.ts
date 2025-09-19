import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class RegisterDto {
    @ApiProperty({
        example: 'abc@xyz.com',
        description: 'Email of user',
    })
    @IsEmail()
    @MaxLength(255)
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({
        description: 'Password of user',
        example: 'Pass#123',
    })
    @MinLength(8, {
        message: 'password too short',
    })
    @MaxLength(20, {
        message: 'password too long',
    })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
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