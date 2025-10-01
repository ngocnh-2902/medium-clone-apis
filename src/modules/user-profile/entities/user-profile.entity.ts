import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '@module/users/entities/user.entity';
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { BaseEntity } from "@module/shared/base.entity";
import {USER_PROFILE_CONSTANTS} from "@module/user-profile/user-profile.constant";

@Entity('user_profiles')
export class UserProfile extends BaseEntity {
    @ApiProperty({description: 'User First Name'})
    @IsString()
    @Column({ name: 'first_name', type: 'varchar', length: USER_PROFILE_CONSTANTS.VALIDATION.MAX_FIRST_NAME_LENGTH, nullable: true })
    firstName: string;

    @ApiProperty({description: 'User Last Name'})
    @IsString()
    @Column({ name: 'last_name', type: 'varchar', length: USER_PROFILE_CONSTANTS.VALIDATION.MAX_LAST_NAME_LENGTH, nullable: true })
    lastName: string;

    @ApiProperty({description: 'User bio'})
    @IsString()
    @Column({ name: 'bio', type: 'text', nullable: true })
    bio: string;

    @ApiProperty({description: 'User Image URL'})
    @IsString()
    @Column({ name: 'image', type: 'varchar', length: USER_PROFILE_CONSTANTS.VALIDATION.MAX_IMAGE_LENGTH, nullable: true })
    image: string;

    @ApiProperty({description: 'User Location'})
    @IsString()
    @Column({ name: 'location', type: 'varchar', length: USER_PROFILE_CONSTANTS.VALIDATION.MAX_LOCATION_LENGTH, nullable: true })
    location: string;

    @ApiProperty({description: 'User Website URL'})
    @IsString()
    @Column({ name: 'website', type: 'varchar', length: USER_PROFILE_CONSTANTS.VALIDATION.MAX_WEBSITE_LENGTH, nullable: true })
    website: string;

    @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
}
