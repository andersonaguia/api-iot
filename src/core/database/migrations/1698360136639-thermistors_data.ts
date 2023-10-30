import { MigrationInterface, QueryRunner } from "typeorm";

export class thermistorsData1698360136639 implements MigrationInterface {
    name = 'thermistorsData1698360136639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`thermistors_data\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`value\` decimal(10,2) NOT NULL, \`thermistorId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`thermistors_data\` ADD CONSTRAINT \`FK_42347e9ce19f6366221b36673cd\` FOREIGN KEY (\`thermistorId\`) REFERENCES \`thermistors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`devices\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`thermistors_data\` DROP FOREIGN KEY \`FK_42347e9ce19f6366221b36673cd\``);
        await queryRunner.query(`CREATE TABLE \`devices\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(30) NOT NULL, \`model\` varchar(20) NOT NULL, \`connectionType\` enum ('wifi', 'lan', 'serial') NOT NULL, \`ipAddress\` varchar(20) NOT NULL, \`macAddress\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`DROP TABLE \`thermistors_data\``);
    }

}
