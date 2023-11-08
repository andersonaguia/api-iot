import { MigrationInterface, QueryRunner } from "typeorm";

export class relayData1699448835769 implements MigrationInterface {
    name = 'relayData1699448835769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`relay_data\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`expectedLevel\` tinyint NOT NULL, \`currentLevel\` tinyint NOT NULL, \`relayId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`relay_data\` ADD CONSTRAINT \`FK_fa4d836eebf251f35173607a38d\` FOREIGN KEY (\`relayId\`) REFERENCES \`relays\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`relay_data\` DROP FOREIGN KEY \`FK_fa4d836eebf251f35173607a38d\``);
        await queryRunner.query(`DROP TABLE \`relay_data\``);
    }

}
