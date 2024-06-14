import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialStructure1718399180470 implements MigrationInterface {
    name = 'InitialStructure1718399180470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tasks\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`taskId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(30) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`taskId\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`taskId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`status\` enum ('to_do', 'in_progress', 'done') NOT NULL DEFAULT 'to_do'`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`deadline\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`tags\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`file\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`createdById\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_514623383bc4d768101bcf69462\` FOREIGN KEY (\`taskId\`) REFERENCES \`tasks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_660898d912c6e71107e9ef8f38d\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_660898d912c6e71107e9ef8f38d\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_514623383bc4d768101bcf69462\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`createdById\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`file\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`tags\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`deadline\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`taskId\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`taskId\` varchar(36) NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`tasks\``);
    }

}
