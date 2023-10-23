import { MigrationInterface, QueryRunner } from "typeorm";

export class deviceLocation1698101204755 implements MigrationInterface {
    name = 'deviceLocation1698101204755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`devices\` ADD \`location\` varchar(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`devices\` DROP COLUMN \`location\``);
    }

}
