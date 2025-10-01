import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FollowDto {
    @ApiProperty({ description: 'The following user ID' })
    @IsNumber()
    followingId: number;
}