import { MigrationInterface, QueryRunner } from "typeorm";

export class thermistors1698106392386 implements MigrationInterface {
    name = 'thermistors1698106392386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`thermistors\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`value\` decimal(10,2) NOT NULL, \`device_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`thermistors\` ADD CONSTRAINT \`FK_14f3f56912ec6db599913a0f0d6\` FOREIGN KEY (\`device_id\`) REFERENCES \`devices\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`thermistors\` DROP FOREIGN KEY \`FK_14f3f56912ec6db599913a0f0d6\``);
        await queryRunner.query(`DROP TABLE \`thermistors\``);
    }

}
