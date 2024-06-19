import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitInvest1684747134056 implements MigrationInterface {
  public name = 'InitInvest1684747134056';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`investAccounts\` (
            \`id\` char(36) NOT NULL,
            \`accountId\` char(36) NOT NULL,
            \`reference\` varchar(255) NOT NULL,
            \`login\` varchar(255) NOT NULL,
            \`platform\` varchar(64) NOT NULL,
            \`platformName\` varchar(128) NOT NULL,
            \`server\` varchar(255) NOT NULL,
            \`group\` varchar(64) DEFAULT NULL,
            \`serverType\` varchar(16) DEFAULT NULL,
            \`currency\` varchar(3) NOT NULL,
            \`partnership\` varchar(255) DEFAULT NULL,
            \`status\` varchar(16) NOT NULL,
            \`subStatus\` varchar(32) NOT NULL,
            \`supportsLeverage\` int(1) DEFAULT '0',
            \`sendReports\` int(1) DEFAULT '1',
            \`lastUpdateHash\` varchar(255) DEFAULT NULL,
            \`customName\` varchar(255) DEFAULT NULL,
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            PRIMARY KEY (\`id\`),
            UNIQUE KEY \`investaccounts_id_unique\` (\`id\`),
            UNIQUE KEY \`investaccounts_reference_unique\` (\`reference\`),
            UNIQUE KEY \`investaccounts_login_server_unique\` (\`login\`,\`server\`),
            KEY \`investAccountAccountIdIdx\` (\`accountId\`),
            KEY \`investAccountCreatedIdx\` (\`created\`),
            CONSTRAINT \`investaccounts_accountid_foreign\` FOREIGN KEY (\`accountId\`) REFERENCES \`profiles\` (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`investAccounts\` DROP FOREIGN KEY \`investaccounts_accountid_foreign\``);
    await queryRunner.query(`DROP INDEX \`investaccounts_id_unique\` ON \`investAccounts\``);
    await queryRunner.query(`DROP INDEX \`investaccounts_reference_unique\` ON \`investAccounts\``);
    await queryRunner.query(`DROP INDEX \`investaccounts_login_server_unique\` ON \`investAccounts\``);
    await queryRunner.query(`DROP INDEX \`investAccountAccountIdIdx\` ON \`investAccounts\``);
    await queryRunner.query(`DROP INDEX \`investAccountCreatedIdx\` ON \`investAccounts\``);
    await queryRunner.query(`DROP TABLE \`investAccounts\``);
  }

}
