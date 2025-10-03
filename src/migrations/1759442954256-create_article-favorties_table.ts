import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateArticleFavoritesTable1759442954256 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'article_favorites',
                columns: [
                    { name: 'id', type: 'bigint', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'user_id', type: 'bigint' },
                    { name: 'article_id', type: 'bigint' },
                    { name: 'updated_at', type: 'timestamp', default: 'now()' },
                    { name: 'created_at', type: 'timestamp', default: 'now()' },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            'article_favorites',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'article_favorites',
            new TableForeignKey({
                columnNames: ['article_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'articles',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('article_favorites');
    }

}
