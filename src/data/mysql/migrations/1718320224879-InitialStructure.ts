import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialStructure1718320224879 implements MigrationInterface {
    name = 'InitialStructure1718320224879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`task_model\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`status\` enum ('to_do', 'in_progress', 'done') NOT NULL DEFAULT 'to_do', \`deadline\` datetime NOT NULL, \`created_by\` varchar(255) NOT NULL, \`comments\` varchar(255) NOT NULL, \`tags\` varchar(255) NOT NULL, \`file\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_model\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(30) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(20) NOT NULL, UNIQUE INDEX \`IDX_864bd044bba869304084843358\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`task_model\` ADD CONSTRAINT \`FK_e9446323421abd86f311220e288\` FOREIGN KEY (\`userId\`) REFERENCES \`user_model\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task_model\` DROP FOREIGN KEY \`FK_e9446323421abd86f311220e288\``);
        await queryRunner.query(`DROP INDEX \`IDX_864bd044bba869304084843358\` ON \`user_model\``);
        await queryRunner.query(`DROP TABLE \`user_model\``);
        await queryRunner.query(`DROP TABLE \`task_model\``);
    }

}
