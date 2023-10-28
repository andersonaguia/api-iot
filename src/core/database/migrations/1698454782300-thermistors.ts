import { MigrationInterface, QueryRunner } from "typeorm";

export class thermistors1698454782300 implements MigrationInterface {
    name = 'thermistors1698454782300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a576d99c2d2400bad7780d40d0\` ON \`thermistors\``);
        await queryRunner.query(`ALTER TABLE \`thermistors\` DROP COLUMN \`serialNumber\``);
        await queryRunner.query(`ALTER TABLE \`thermistors\` ADD \`serialNumber\` varchar(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`thermistors\` ADD UNIQUE INDEX \`IDX_a576d99c2d2400bad7780d40d0\` (\`serialNumber\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`thermistors\` DROP INDEX \`IDX_a576d99c2d2400bad7780d40d0\``);
        await queryRunner.query(`ALTER TABLE \`thermistors\` DROP COLUMN \`serialNumber\``);
        await queryRunner.query(`ALTER TABLE \`thermistors\` ADD \`serialNumber\` varchar(30) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a576d99c2d2400bad7780d40d0\` ON \`thermistors\` (\`serialNumber\`)`);
    }

}
