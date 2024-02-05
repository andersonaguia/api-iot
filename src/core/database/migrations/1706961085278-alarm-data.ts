import { MigrationInterface, QueryRunner } from "typeorm";

export class alarmData1706961085278 implements MigrationInterface {
    name = 'alarmData1706961085278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`alarm_data\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`enabled\` tinyint NOT NULL, \`sendMessage\` tinyint NOT NULL, \`visible\` tinyint NOT NULL, \`message\` varchar(255) NOT NULL, \`alarmId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`alarm_data\` ADD CONSTRAINT \`FK_f06c28d95f12037ca0beddad378\` FOREIGN KEY (\`alarmId\`) REFERENCES \`alarms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`alarm_data\` DROP FOREIGN KEY \`FK_f06c28d95f12037ca0beddad378\``);
        await queryRunner.query(`DROP TABLE \`alarm_data\``);
    }

}
