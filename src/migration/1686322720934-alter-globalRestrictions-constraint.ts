import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterGlobalRestrictionsConstraint1686322720934 implements MigrationInterface {
  public name = 'AlterGlobalRestrictionsConstraint1686322720934';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`globalRestrictions\` DROP KEY \`globalRestrictionsUnique\``);

    await queryRunner.query(`ALTER TABLE \`globalRestrictions\` ADD CONSTRAINT \`globalRestrictionsUnique\`
    UNIQUE KEY (\`authority\`,\`country\`,\`appropriateness\`,\`clientType\`,\`profileStatus\`)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`globalRestrictions\` DROP KEY \`globalRestrictionsUnique\``);

    await queryRunner.query(`ALTER TABLE \`globalRestrictions\` ADD CONSTRAINT \`globalRestrictionsUnique\`
    UNIQUE KEY (\`authority\`,\`country\`,\`appropriateness\`,\`clientType\`,\`riskAppetite\`)`);
  }
}
