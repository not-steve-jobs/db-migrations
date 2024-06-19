import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitIncapsula1684505817500 implements MigrationInterface {
  public name = 'InitIncapsula1684505817500';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`incapsulaEmails\` (
          \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT,
          \`ip\` varchar(34) NOT NULL,
          \`email\` varchar(255) NOT NULL,
          \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
          PRIMARY KEY (\`id\`),
          KEY \`incapsulaEmailsIpIdx\` (\`ip\`),
          KEY \`incapsulaEmailsEmailIdx\` (\`email\`),
          KEY \`incapsulaEmailsCreatedIdx\` (\`created\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`incapsulaRules\` (
          \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT,
          \`ip\` varchar(34) NOT NULL,
          \`action\` varchar(34) NOT NULL,
          \`ruleId\` varchar(255) NOT NULL,
          \`unblockTs\` int(11) NOT NULL,
          \`rawResponse\` text NOT NULL,
          \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
          PRIMARY KEY (\`id\`),
          KEY \`incapsulaRulesIpIdx\` (\`ip\`),
          KEY \`incapsulaRulesRuleIdIdx\` (\`ruleId\`),
          KEY \`incapsulaRulesUnblockTsIdx\` (\`unblockTs\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`incapsulaRulesUnblockTsIdx\` ON \`incapsulaRules\``);
    await queryRunner.query(`DROP INDEX \`incapsulaRulesRuleIdIdx\` ON \`incapsulaRules\``);
    await queryRunner.query(`DROP INDEX \`incapsulaRulesIpIdx\` ON \`incapsulaRules\``);
    await queryRunner.query(`DROP TABLE \`incapsulaRules\``);
    await queryRunner.query(`DROP INDEX \`incapsulaEmailsCreatedIdx\` ON \`incapsulaEmails\``);
    await queryRunner.query(`DROP INDEX \`incapsulaEmailsEmailIdx\` ON \`incapsulaEmails\``);
    await queryRunner.query(`DROP INDEX \`incapsulaEmailsIpIdx\` ON \`incapsulaEmails\``);
    await queryRunner.query(`DROP TABLE \`incapsulaEmails\``);
  }

}
