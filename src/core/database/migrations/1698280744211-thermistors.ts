import { MigrationInterface, QueryRunner } from "typeorm";

export class thermistors1698280744211 implements MigrationInterface {
    name = 'thermistors1698280744211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`thermistors\` DROP FOREIGN KEY \`FK_14f3f56912ec6db599913a0f0d6\``);
        await queryRunner.query(`ALTER TABLE \`thermistors\` CHANGE \`device_id\` \`controllerId\` int NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`controllers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(30) NOT NULL, \`model\` varchar(20) NOT NULL, \`connectionType\` enum ('wifi', 'lan', 'serial') NOT NULL, \`ipAddress\` varchar(20) NOT NULL, \`macAddress\` varchar(50) NOT NULL, \`location\` varchar(50) NOT NULL, UNIQUE INDEX \`IDX_02d6bfc4b15f3d58fd017c8430\` (\`ipAddress\`), UNIQUE INDEX \`IDX_280220d330bae5da815da92bb6\` (\`macAddress\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`thermistors\` DROP COLUMN \`value\``);
        await queryRunner.query(`ALTER TABLE \`thermistors\` ADD \`manufacturer\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`thermistors\` ADD \`model\` varchar(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`thermistors\` ADD \`minRange\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`thermistors\` ADD \`maxRange\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`thermistors\` ADD \`nominalResistance\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`thermistors\` ADD \`voltageDividerResistance\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`thermistors\` ADD \`serialNumber\` varchar(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`thermistors\` ADD \`controllerPort\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`thermistors\` ADD \`location\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`thermistors\` ADD \`value\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`devices\` ADD UNIQUE INDEX \`IDX_a4342b64c24502d594be3687c7\` (\`ipAddress\`)`);
        await queryRunner.query(`ALTER TABLE \`devices\` ADD UNIQUE INDEX \`IDX_b53f9f3cf7a54152cbb70dd75c\` (\`macAddress\`)`);
        await queryRunner.query(`ALTER TABLE \`thermistors\` ADD CONSTRAINT \`FK_0ce88266f3a808b09b3d4374e38\` FOREIGN KEY (\`controllerId\`) REFERENCES \`controllers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`thermistors\` DROP FOREIGN KEY \`FK_0ce88266f3a808b09b3d4374e38\``);
        await queryRunner.query(`ALTER TABLE \`devices\` DROP INDEX \`IDX_b53f9f3cf7a54152cbb70dd75c\``);
        await queryRunner.query(`ALTER TABLE \`devices\` DROP INDEX \`IDX_a4342b64c24502d594be3687c7\``);
        await queryRunner.query(`ALTER TABLE \`thermistors\` DROP COLUMN \`value\``);
        await queryRunner.query(`ALTER TABLE \`thermistors\` DROP COLUMN \`location\``);
        await queryRunner.query(`ALTER TABLE \`thermistors\` DROP COLUMN \`controllerPort\``);
        await queryRunner.query(`ALTER TABLE \`thermistors\` DROP COLUMN \`serialNumber\``);
        await queryRunner.query(`ALTER TABLE \`thermistors\` DROP COLUMN \`voltageDividerResistance\``);
        await queryRunner.query(`ALTER TABLE \`thermistors\` DROP COLUMN \`nominalResistance\``);
        await queryRunner.query(`ALTER TABLE \`thermistors\` DROP COLUMN \`maxRange\``);
        await queryRunner.query(`ALTER TABLE \`thermistors\` DROP COLUMN \`minRange\``);
        await queryRunner.query(`ALTER TABLE \`thermistors\` DROP COLUMN \`model\``);
        await queryRunner.query(`ALTER TABLE \`thermistors\` DROP COLUMN \`manufacturer\``);
        await queryRunner.query(`ALTER TABLE \`thermistors\` ADD \`value\` decimal NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_280220d330bae5da815da92bb6\` ON \`controllers\``);
        await queryRunner.query(`DROP INDEX \`IDX_02d6bfc4b15f3d58fd017c8430\` ON \`controllers\``);
        await queryRunner.query(`DROP TABLE \`controllers\``);
        await queryRunner.query(`ALTER TABLE \`thermistors\` CHANGE \`controllerId\` \`device_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`thermistors\` ADD CONSTRAINT \`FK_14f3f56912ec6db599913a0f0d6\` FOREIGN KEY (\`device_id\`) REFERENCES \`devices\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
