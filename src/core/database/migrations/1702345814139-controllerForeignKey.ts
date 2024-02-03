import { MigrationInterface, QueryRunner } from "typeorm";

export class controllerForeignKey1702345814139 implements MigrationInterface {
    name = 'controllerForeignKey1702345814139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`controllers\` ADD \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`controllers\` ADD CONSTRAINT \`FK_7e480803360a2f462551bd0906e\` FOREIGN KEY (\`userId\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`controllers\` DROP FOREIGN KEY \`FK_7e480803360a2f462551bd0906e\``);
        await queryRunner.query(`ALTER TABLE \`controllers\` DROP COLUMN \`userId\``);
    }

}
