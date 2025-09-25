import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateArticlesTable1758567884771 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'articles',
                columns: [
                    {
                        name: 'id',
                        type: 'bigint',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'author_id',
                        type: 'bigint',
                        isNullable: false,
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'slug',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'excerpt',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'content',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'published_at',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('articles');
    }
}
