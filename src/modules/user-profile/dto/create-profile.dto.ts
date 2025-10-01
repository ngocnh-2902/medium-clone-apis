import {IsNotEmpty, IsString, MaxLength} from "class-validator";
import {USER_PROFILE_CONSTANTS} from "@module/user-profile/user-profile.constant";

export class CreateUserProfileDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(USER_PROFILE_CONSTANTS.VALIDATION.MAX_FIRST_NAME_LENGTH)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(USER_PROFILE_CONSTANTS.VALIDATION.MAX_LAST_NAME_LENGTH)
    lastName: string;

    @IsString()
    @MaxLength(USER_PROFILE_CONSTANTS.VALIDATION.MAX_BIO_LENGTH)
    bio?: string;

    @IsString()
    @MaxLength(USER_PROFILE_CONSTANTS.VALIDATION.MAX_IMAGE_LENGTH)
    imageUrl?: string;

    @IsString()
    @MaxLength(USER_PROFILE_CONSTANTS.VALIDATION.MAX_LOCATION_LENGTH)
    location?: string;

    @IsString()
    @MaxLength(USER_PROFILE_CONSTANTS.VALIDATION.MAX_WEBSITE_LENGTH)
    website?: string;
}
