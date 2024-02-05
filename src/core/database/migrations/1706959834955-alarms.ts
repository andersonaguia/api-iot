import { MigrationInterface, QueryRunner } from "typeorm";

export class alarms1706959834955 implements MigrationInterface {
    name = 'alarms1706959834955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`alarms\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`surname\` varchar(255) NOT NULL, \`controllerPort\` varchar(10) NOT NULL, \`controllerId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`alarms\` ADD CONSTRAINT \`FK_676621de295255e01007445bfb8\` FOREIGN KEY (\`controllerId\`) REFERENCES \`controllers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`alarms\` DROP FOREIGN KEY \`FK_676621de295255e01007445bfb8\``);
        await queryRunner.query(`DROP TABLE \`alarms\``);
    }

}
