import { MigrationInterface, QueryRunner } from "typeorm";

export class init1698086908398 implements MigrationInterface {
    name = 'init1698086908398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`system_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`fullName\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(255) NOT NULL, \`occupation\` varchar(255) NULL, \`salt\` varchar(255) NOT NULL, \`role\` enum ('admin', 'supervisor', 'manager', 'user') NOT NULL DEFAULT 'user', UNIQUE INDEX \`IDX_73dff187ed765e8403bf5fc911\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_73dff187ed765e8403bf5fc911\` ON \`system_users\``);
        await queryRunner.query(`DROP TABLE \`system_users\``);
    }

}
