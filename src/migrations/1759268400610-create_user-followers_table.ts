import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateUserFollowersTable1759268400610 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user_followers',
                columns: [
                    {
                        name: 'id',
                        type: 'bigint',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'follower_id',
                        type: 'bigint',
                        isNullable: false,
                    },
                    {
                        name: 'following_id',
                        type: 'bigint',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
                uniques: [{ columnNames: ['follower_id', 'following_id'] }],
            }),
        );

        await queryRunner.createForeignKeys('user_followers', [
            new TableForeignKey({
                columnNames: ['follower_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['following_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_followers');
    }
}
