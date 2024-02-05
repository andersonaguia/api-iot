import { MigrationInterface, QueryRunner } from "typeorm";

export class alarmsAddMessage1707078008093 implements MigrationInterface {
    name = 'alarmsAddMessage1707078008093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`alarms\` ADD \`message\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`alarms\` DROP COLUMN \`message\``);
    }

}
