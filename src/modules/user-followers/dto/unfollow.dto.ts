import { PartialType } from '@nestjs/swagger';
import { FollowDto } from './follow.dto';

export class UnfollowDto extends PartialType(FollowDto) {}
