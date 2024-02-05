import { MigrationInterface, QueryRunner } from "typeorm";

export class alarmDataDelMessage1707077856531 implements MigrationInterface {
    name = 'alarmDataDelMessage1707077856531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`alarm_data\` DROP COLUMN \`message\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`alarm_data\` ADD \`message\` varchar(255) NOT NULL`);
    }

}
