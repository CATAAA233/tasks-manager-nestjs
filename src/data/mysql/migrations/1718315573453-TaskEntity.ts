import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskEntity1718315573453 implements MigrationInterface {
    name = 'TaskEntity1718315573453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`task_entity\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`status\` enum ('to_do', 'in_progress', 'done') NOT NULL DEFAULT 'to_do', \`deadline\` datetime NOT NULL, \`created_by\` varchar(255) NOT NULL, \`comments\` varchar(255) NOT NULL, \`tags\` varchar(255) NOT NULL, \`file\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`task_entity\``);
    }

}
