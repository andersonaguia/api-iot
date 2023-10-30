import { MigrationInterface, QueryRunner } from "typeorm";

export class activeProperty1698087315167 implements MigrationInterface {
    name = 'activeProperty1698087315167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`system_users\` ADD \`active\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`system_users\` DROP COLUMN \`active\``);
    }

}
