import { MigrationInterface, QueryRunner } from "typeorm";

export class devices1698093353289 implements MigrationInterface {
    name = 'devices1698093353289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`devices\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(30) NOT NULL, \`model\` varchar(20) NOT NULL, \`connectionType\` enum ('wifi', 'lan', 'serial') NOT NULL, \`ipAddress\` varchar(20) NOT NULL, \`macAddress\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`devices\``);
    }

}
