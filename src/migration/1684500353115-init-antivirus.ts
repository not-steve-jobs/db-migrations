import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitAntivirus1684500353115 implements MigrationInterface {
  public name = 'InitAntivirus1684500353115';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`malwareChecks\` (
          \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT,
          \`fileId\` char(36) NOT NULL,
          \`infected\` tinyint(1) DEFAULT '0',
          \`viruses\` varchar(255) DEFAULT NULL,
          \`taskStatus\` varchar(11) NOT NULL,
          \`taskDescription\` varchar(255) DEFAULT NULL,
          \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
          PRIMARY KEY (\`id\`),
          UNIQUE KEY \`malwarechecks_fileid_unique\` (\`fileId\`),
          KEY \`malwareChecksTaskStatusIdx\` (\`taskStatus\`),
          KEY \`malwareChecksCreatedIdx\` (\`created\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`malwarechecks_fileid_unique\` ON \`malwareChecks\``);
    await queryRunner.query(`DROP INDEX \`malwareChecksTaskStatusIdx\` ON \`malwareChecks\``);
    await queryRunner.query(`DROP INDEX \`malwareChecksCreatedIdx\` ON \`malwareChecks\``);
    await queryRunner.query(`DROP TABLE \`malwareChecks\``);
  }

}
