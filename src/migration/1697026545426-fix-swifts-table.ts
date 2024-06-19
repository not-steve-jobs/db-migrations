import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixSwiftsTable1697026545426 implements MigrationInterface {
  public name = FixSwiftsTable1697026545426.name;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`swifts\` CHANGE \`rawResponse\` \`rawResponse\` text NOT NULL DEFAULT ''`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`swifts\` CHANGE \`rawResponse\` \`rawResponse\` text NOT NULL`);
  }

}
