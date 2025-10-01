import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
    Entity,
    Column,
    OneToOne,
    OneToMany,
    JoinColumn
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '@module/shared/base.entity';
import { Comment } from '@module/comments/entities/comment.entity';
import { UserProfile } from '@module/user-profile/entities/user-profile.entity';
import { UserFollower } from '@module/user-followers/entities/user-follower.entity';

@Entity('users')
export class User extends BaseEntity {
    @ApiProperty({ description: 'Email address', example: 'abc@xyz.com' })
    @Column({ unique: true })
    @IsEmail()
    email: string;

    @ApiHideProperty()
    @Column()
    @Exclude({ toPlainOnly: true })
    password: string;

    @OneToMany(() => Comment, (comment) => comment.author)
    @JoinColumn({ name: 'id', referencedColumnName: 'author_id' })
    comments: Comment[];

    @OneToOne(() => UserProfile, (profile) => profile.user)
    profile: UserProfile;

    @OneToMany(() => UserFollower, (uf) => uf.following)
    followers: UserFollower[];

    @OneToMany(() => UserFollower, (uf) => uf.follower)
    followings: UserFollower[];
}