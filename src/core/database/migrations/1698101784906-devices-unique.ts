import { MigrationInterface, QueryRunner } from "typeorm";

export class devicesUnique1698101784906 implements MigrationInterface {
    name = 'devicesUnique1698101784906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`devices\` ADD UNIQUE INDEX \`IDX_a4342b64c24502d594be3687c7\` (\`ipAddress\`)`);
        await queryRunner.query(`ALTER TABLE \`devices\` ADD UNIQUE INDEX \`IDX_b53f9f3cf7a54152cbb70dd75c\` (\`macAddress\`)`);
        await queryRunner.query(`ALTER TABLE \`devices\` ADD UNIQUE INDEX \`IDX_a4342b64c24502d594be3687c7\` (\`ipAddress\`)`);
        await queryRunner.query(`ALTER TABLE \`devices\` ADD UNIQUE INDEX \`IDX_b53f9f3cf7a54152cbb70dd75c\` (\`macAddress\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`devices\` DROP INDEX \`IDX_b53f9f3cf7a54152cbb70dd75c\``);
        await queryRunner.query(`ALTER TABLE \`devices\` DROP INDEX \`IDX_a4342b64c24502d594be3687c7\``);
        await queryRunner.query(`ALTER TABLE \`devices\` DROP INDEX \`IDX_b53f9f3cf7a54152cbb70dd75c\``);
        await queryRunner.query(`ALTER TABLE \`devices\` DROP INDEX \`IDX_a4342b64c24502d594be3687c7\``);
    }

}
