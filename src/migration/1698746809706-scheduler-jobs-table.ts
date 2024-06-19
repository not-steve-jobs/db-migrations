import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchedulerJobsTable1698746809706 implements MigrationInterface {
  name = 'SchedulerJobsTable1698746809706';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`schedulerJobs\` (
            \`id\` varchar(64) NOT NULL,
            \`name\` varchar(200) NOT NULL,
            \`status\` varchar(20) NOT NULL,
            \`expectedStartDate\` timestamp(3) NULL,
            \`retries\` smallint NOT NULL,
            \`leftRetries\` smallint NOT NULL,
            \`recurringIntervalMinutes\` int NULL,
            \`apiUrl\` varchar(255) NOT NULL,
            \`apiMethod\` varchar(10) NOT NULL,
            \`data\` longtext NULL,
            \`errorInfo\` text NULL,
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            INDEX \`fkJobExpectedStartDateIdx\` (\`expectedStartDate\`),
            INDEX \`fkJobStatusIdx\` (\`status\`),
            PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`fkJobStatusIdx\` ON \`schedulerJobs\``);
    await queryRunner.query(`DROP INDEX \`fkJobExpectedStartDateIdx\` ON \`schedulerJobs\``);
    await queryRunner.query(`DROP TABLE \`schedulerJobs\``);
  }

}
