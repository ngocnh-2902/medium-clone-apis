import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";
import {USER_PROFILE_CONSTANTS} from "@module/user-profile/user-profile.constant";

export class CreateUserProfileTable1759267976176 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user_profiles',
                columns: [
                    {
                        name: 'id',
                        type: 'bigint',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'user_id',
                        type: 'bigint',
                        isUnique: true,
                    },
                    {
                        name: 'first_name',
                        type: 'varchar',
                        length: `${USER_PROFILE_CONSTANTS.VALIDATION.MAX_FIRST_NAME_LENGTH || 100}`,
                        isNullable: true,
                    },
                    {
                        name: 'last_name',
                        type: 'varchar',
                        length: `${USER_PROFILE_CONSTANTS.VALIDATION.MAX_LAST_NAME_LENGTH || 100}`,
                        isNullable: true,
                    },
                    {
                        name: 'bio',
                        type: 'text',
                        length: `${USER_PROFILE_CONSTANTS.VALIDATION.MAX_BIO_LENGTH || 500}`,
                        isNullable: true,
                    },
                    {
                        name: 'image',
                        type: 'varchar',
                        length: `${USER_PROFILE_CONSTANTS.VALIDATION.MAX_IMAGE_LENGTH || 255}`,
                        isNullable: true,
                    },
                    {
                        name: 'location',
                        type: 'varchar',
                        length: `${USER_PROFILE_CONSTANTS.VALIDATION.MAX_LOCATION_LENGTH || 255}`,
                        isNullable: true,
                    },
                    {
                        name: 'website',
                        type: 'varchar',
                        length: `${USER_PROFILE_CONSTANTS.VALIDATION.MAX_WEBSITE_LENGTH || 255}`,
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        isNullable: true,
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        isNullable: true,
                        default: 'now()',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'user_profiles',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_profile');
    }

}
