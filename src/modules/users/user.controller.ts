import { Controller, Get } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { User } from './user.entity';
import { UserService } from './user.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiOkResponse({ description: "Get logged in user's details", type: User })
    @ApiBearerAuth()
    @Get('me')
    async getMe(userId: number): Promise<User> {
        return this.usersService.getMe(userId);
    }
}