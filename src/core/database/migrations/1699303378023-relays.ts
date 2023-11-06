import { MigrationInterface, QueryRunner } from "typeorm";

export class relays1699303378023 implements MigrationInterface {
    name = 'relays1699303378023'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`relays\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`activeAtLowLevel\` tinyint NOT NULL DEFAULT 0, \`surname\` varchar(50) NOT NULL, \`controllerPort\` int NOT NULL, \`controllerId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`relays\` ADD CONSTRAINT \`FK_d3cd6218ed84df9d8f20f69d8e3\` FOREIGN KEY (\`controllerId\`) REFERENCES \`controllers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`relays\` DROP FOREIGN KEY \`FK_d3cd6218ed84df9d8f20f69d8e3\``);
        await queryRunner.query(`DROP TABLE \`relays\``);
    }

}
