import {Controller, Get, Post, Body, Param, Delete} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";

import {GetUser} from "@app/common/decorators/get-user.decorator";
import {User} from "@module/users/entities/user.entity";

import {UserFollowersService} from './user-followers.service';
import {FollowDto} from './dto/follow.dto';

@ApiTags('Users')
@Controller('users/:userId')
export class UserFollowersController {
    constructor(private readonly userFollowersService: UserFollowersService) {
    }

    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiOkResponse({ description: "Follow a user" })
    @ApiBearerAuth()
    @Post('follow')
    async follow(@Body() dto: FollowDto, @GetUser() user: User) {
        return this.userFollowersService.follow(user.id, dto);
    }

    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiOkResponse({ description: "Unfollow a user" })
    @ApiBearerAuth()
    @Delete('follow/:followingId')
    async unfollow(@Param('followingId') followingId: number, @GetUser() user: User) {
        return this.userFollowersService.unfollow(user.id, followingId);
    }

    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiOkResponse({ description: "Get followers of a user" })
    @ApiBearerAuth()
    @Get('followers')
    async getFollowers(@Param('userId') userId: number) {
        return this.userFollowersService.getFollowers(userId);
    }

    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiOkResponse({ description: "Get followings of a user" })
    @ApiBearerAuth()
    @Get('/followings')
    async getFollowings(@Param('userId') userId: number) {
        return this.userFollowersService.getFollowings(userId);
    }
}
