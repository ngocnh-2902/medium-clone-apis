import {Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Unique, Column, JoinColumn} from 'typeorm';
import { User } from '@module/users/entities/user.entity';
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

@Entity('user_followers')
@Unique(['follower', 'following'])
export class UserFollower {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({description: 'Follower ID'})
    @Column({name: 'follower_id', type: 'bigint'})
    @IsString()
    @IsNotEmpty()
    followerId: number;

    @ManyToOne(() => User, (user) => user.followings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'follower_id' })
    follower: User;

    @ApiProperty({description: 'Following ID'})
    @Column({name: 'following_id', type: 'bigint'})
    @IsString()
    @IsNotEmpty()
    followingId: number;

    @ManyToOne(() => User, (user) => user.followers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'following_id' })
    following: User;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
