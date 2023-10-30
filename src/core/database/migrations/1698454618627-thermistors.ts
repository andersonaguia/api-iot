import { MigrationInterface, QueryRunner } from "typeorm";

export class thermistors1698454618627 implements MigrationInterface {
    name = 'thermistors1698454618627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`thermistors\` DROP COLUMN \`controllerPort\``);
        await queryRunner.query(`ALTER TABLE \`thermistors\` ADD \`controllerPort\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`thermistors\` DROP COLUMN \`controllerPort\``);
        await queryRunner.query(`ALTER TABLE \`thermistors\` ADD \`controllerPort\` varchar(20) NOT NULL`);
    }

}
