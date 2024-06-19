import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchedulerJobsRequest1702983183154 implements MigrationInterface {
  public readonly name = SchedulerJobsRequest1702983183154.name;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`schedulerJobs\` ADD \`requestId\` varchar(36) NULL;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`schedulerJobs\` DROP COLUMN \`requestId\`;`);
  }
}
