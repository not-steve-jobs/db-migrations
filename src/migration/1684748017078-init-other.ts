import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitOther1684748017078 implements MigrationInterface {
  public name = 'InitOther1684748017078';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`pushNotifications\` (
            \`id\` char(36) NOT NULL,
            \`profileId\` char(36) DEFAULT NULL,
            \`platform\` char(10) NOT NULL,
            \`os\` char(10) NOT NULL,
            \`deviceId\` char(255) DEFAULT NULL,
            \`deviceLanguage\` char(2) NOT NULL,
            \`deviceTimeZone\` char(6) NOT NULL,
            \`enabled\` tinyint(1) NOT NULL DEFAULT '0',
            \`tag\` varchar(255) NOT NULL,
            \`region\` varchar(5) NOT NULL DEFAULT 'eu',
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            \`osVersion\` varchar(50) DEFAULT '',
            PRIMARY KEY (\`id\`),
            UNIQUE KEY \`pushNotificationsUniqueTag\` (\`tag\`),
            KEY \`pushNotificationsTagIdx\` (\`tag\`),
            KEY \`fkPushNotificationsProfilesIdx\` (\`profileId\`),
            KEY \`pushNotificationsDeviceIdIdx\` (\`deviceId\`),
            CONSTRAINT \`fkPushNotificationsProfiles\` FOREIGN KEY (\`profileId\`) REFERENCES \`profiles\` (\`id\`) ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`smsJobs\` (
            \`id\` char(36) NOT NULL,
            \`provider\` varchar(20) NOT NULL,
            \`status\` varchar(20) NOT NULL,
            \`statusDescription\` varchar(255) DEFAULT NULL,
            \`accountId\` char(36) NOT NULL,
            \`message\` varchar(255) NOT NULL,
            \`to\` varchar(20) NOT NULL,
            \`from\` varchar(20) NOT NULL,
            \`reference\` varchar(100) NOT NULL,
            \`rawRequest\` text,
            \`rawResponse\` text,
            \`rawCallback\` text,
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            PRIMARY KEY (\`id\`),
            UNIQUE KEY \`smsjobs_reference_unique\` (\`reference\`),
            KEY \`smsjobs_accountid_foreign\` (\`accountId\`),
            KEY \`referenceIdx\` (\`reference\`),
            KEY \`smsJobsCreatedIdx\` (\`created\`),
            CONSTRAINT \`smsjobs_accountid_foreign\` FOREIGN KEY (\`accountId\`) REFERENCES \`profiles\` (\`id\`) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`smsJobs\` DROP FOREIGN KEY \`smsjobs_accountid_foreign\``);
    await queryRunner.query(`ALTER TABLE \`pushNotifications\` DROP FOREIGN KEY \`fkPushNotificationsProfiles\``);
    await queryRunner.query(`DROP INDEX \`smsjobs_reference_unique\` ON \`smsJobs\``);
    await queryRunner.query(`DROP INDEX \`referenceIdx\` ON \`smsJobs\``);
    await queryRunner.query(`DROP INDEX \`smsJobsCreatedIdx\` ON \`smsJobs\``);
    await queryRunner.query(`DROP TABLE \`smsJobs\``);
    await queryRunner.query(`DROP INDEX \`pushNotificationsUniqueTag\` ON \`pushNotifications\``);
    await queryRunner.query(`DROP INDEX \`pushNotificationsTagIdx\` ON \`pushNotifications\``);
    await queryRunner.query(`DROP INDEX \`fkPushNotificationsProfilesIdx\` ON \`pushNotifications\``);
    await queryRunner.query(`DROP INDEX \`pushNotificationsDeviceIdIdx\` ON \`pushNotifications\``);
    await queryRunner.query(`DROP TABLE \`pushNotifications\``);
  }

}
