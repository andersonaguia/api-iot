import { MigrationInterface, QueryRunner } from "typeorm";

export class thermistors1698335295637 implements MigrationInterface {
    name = 'thermistors1698335295637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`thermistors\` DROP COLUMN \`value\``);
        await queryRunner.query(`ALTER TABLE \`thermistors\` ADD UNIQUE INDEX \`IDX_a576d99c2d2400bad7780d40d0\` (\`serialNumber\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`thermistors\` DROP INDEX \`IDX_a576d99c2d2400bad7780d40d0\``);
        await queryRunner.query(`ALTER TABLE \`thermistors\` ADD \`value\` decimal NOT NULL`);
    }

}
