import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustTablesAfterMariaDbUpgrade1696925812349 implements MigrationInterface {
  public name = AdjustTablesAfterMariaDbUpgrade1696925812349.name;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`paymentsTimeline\` CHANGE \`rawResponse\` \`rawResponse\` text NOT NULL DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE \`paymentsTimeline\` CHANGE \`rawRequest\` \`rawRequest\` text NOT NULL DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE \`accounts\` CHANGE \`partnership\` \`partnership\` varchar(256) NOT NULL DEFAULT ''`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`accounts\` CHANGE \`partnership\` \`partnership\` varchar(256) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`paymentsTimeline\` CHANGE \`rawRequest\` \`rawRequest\` text NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`paymentsTimeline\` CHANGE \`rawResponse\` \`rawResponse\` text NOT NULL`);
  }

}
