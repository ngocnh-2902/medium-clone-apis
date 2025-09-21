import {Controller, Body, Post, HttpCode, HttpStatus} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiOkResponse, ApiTags,
} from '@nestjs/swagger';

import {AuthService} from './auth.service';
import {LoginDto} from "./dto/login.dto";
import {RegisterDto} from "./dto/register.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @ApiBadRequestResponse({
        description: 'Return errors for invalid login fields',
    })
    @ApiOkResponse({ description: 'User has been successfully logged in' })
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
        return this.authService.login(loginDto);
    }

    @ApiConflictResponse({
        description: 'User already exists',
    })
    @ApiBadRequestResponse({
        description: 'Return errors for invalid sign up fields',
    })
    @ApiCreatedResponse({
        description: 'User has been successfully signed up',
    })
    @Post('/register')
    async registerUser(@Body() input: RegisterDto) {
        return this.authService.register(input);
    }
}
