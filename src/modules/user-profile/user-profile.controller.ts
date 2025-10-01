import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserProfileService } from '@module/user-profile/user-profile.service';
import { CreateUserProfileDto } from '@module/user-profile/dto/create-profile.dto';
import { UpdateUserProfileDto } from '@module/user-profile/dto/update-profile.dto';
import {ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: "Get user profile" })
  @ApiBearerAuth()
  @Get(':userId/profile')
  getProfile(@Param('userId') userId: number) {
    return this.userProfileService.getProfile(userId);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: "Update user profile" })
  @ApiBearerAuth()
  @Patch(':userId/profile')
  update(@Param('userId') userId: number, @Body() updateUserProfileDto: UpdateUserProfileDto) {
    return this.userProfileService.updateProfile(userId, updateUserProfileDto);
  }
}
