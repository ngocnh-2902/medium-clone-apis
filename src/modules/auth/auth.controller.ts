import {Controller, Body, Post, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiBearerAuth,
    ApiUnauthorizedResponse,
    ApiTags,
} from '@nestjs/swagger';
import { I18nService, I18nContext } from 'nestjs-i18n';

import {AuthService} from './auth.service';
import {LoginDto} from "./dto/login.dto";
import {RegisterDto} from "./dto/register.dto";

import { Public } from '../../common/decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private readonly i18n: I18nService) {
    }

    @ApiBadRequestResponse({
        description: 'Return errors for invalid login fields',
    })
    @ApiOkResponse({ description: '' })
    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
        return this.authService.login(loginDto);
    }

    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiOkResponse({ description: 'User has been successfully signed out' })
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @Post('logout')
    signOut(userId: number): Promise<void> {
        return this.authService.logout(userId);
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
    @Public()
    @Post('/register')
    async registerUser(@Body() input: RegisterDto) {
        return this.authService.register(input);
    }
}
