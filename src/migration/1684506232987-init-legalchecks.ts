import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitLegalChecks1684506232987 implements MigrationInterface {
  public name = 'InitLegalChecks1684506232987';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`accountPeriodicUpdates\` (
          \`id\` char(36) NOT NULL,
          \`accountId\` char(36) NOT NULL,
          \`status\` varchar(40) NOT NULL,
          \`personalDataSubmitted\` tinyint(1) NOT NULL DEFAULT '0',
          \`taxIdSubmitted\` tinyint(1) NOT NULL DEFAULT '0',
          \`proofOfResidenceSubmitted\` tinyint(1) NOT NULL DEFAULT '0',
          \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
          \`endDate\` timestamp(3) NOT NULL DEFAULT '0000-00-00 00:00:00.000',
          \`startDate\` timestamp(3) NOT NULL DEFAULT '0000-00-00 00:00:00.000',
          PRIMARY KEY (\`id\`),
          UNIQUE KEY \`accountperiodicupdates_id_unique\` (\`id\`),
          KEY \`accountperiodicupdates_accountid_foreign\` (\`accountId\`),
          CONSTRAINT \`accountperiodicupdates_accountid_foreign\` FOREIGN KEY (\`accountId\`) REFERENCES \`profiles\` (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`accountPeriodicUpdateFields\` (
            \`id\` char(36) NOT NULL,
            \`accountId\` char(36) NOT NULL,
            \`accountPeriodicUpdateId\` char(36) NOT NULL,
            \`key\` varchar(255) NOT NULL,
            \`value\` varchar(255) NOT NULL,
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            PRIMARY KEY (\`id\`),
            UNIQUE KEY \`accountperiodicupdatefields_id_unique\` (\`id\`),
            KEY \`accountperiodicupdatefields_accountid_foreign\` (\`accountId\`),
            KEY \`accountperiodicupdatefields_accountperiodicupdateid_foreign\` (\`accountPeriodicUpdateId\`),
            CONSTRAINT \`accountperiodicupdatefields_accountid_foreign\` FOREIGN KEY (\`accountId\`)
                REFERENCES \`profiles\` (\`id\`),
            CONSTRAINT \`accountperiodicupdatefields_accountperiodicupdateid_foreign\` FOREIGN KEY (\`accountPeriodicUpdateId\`)
                REFERENCES \`accountPeriodicUpdates\` (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`documents\` (
          \`id\` char(36) NOT NULL,
          \`objectId\` varchar(36) NOT NULL,
          \`name\` varchar(255) NOT NULL,
          \`ownerType\` varchar(128) NOT NULL,
          \`ownerId\` char(36) DEFAULT NULL,
          \`docType\` varchar(32) DEFAULT NULL,
          \`mimeType\` varchar(128) DEFAULT NULL,
          \`expirationDate\` date DEFAULT NULL,
          \`side\` varchar(32) NOT NULL DEFAULT 'front',
          \`status\` varchar(32) NOT NULL DEFAULT 'pending',
          \`translation\` mediumtext,
          \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
          PRIMARY KEY (\`id\`),
          UNIQUE KEY \`objectId\` (\`objectId\`),
          KEY \`documentsOwnerTypeOwnerId\` (\`ownerType\`,\`ownerId\`),
          KEY \`documentsOwnerIdIdx\` (\`ownerId\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`legalChecks\` (
            \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT,
            \`accountId\` char(36) NOT NULL,
            \`poiState\` varchar(255) DEFAULT NULL,
            \`porState\` varchar(255) DEFAULT NULL,
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            PRIMARY KEY (\`id\`),
            UNIQUE KEY \`legalChecksUniqueAccountId\` (\`accountId\`),
            CONSTRAINT \`fkLegalChecksProfiles\` FOREIGN KEY (\`accountId\`) REFERENCES \`profiles\` (\`id\`) ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`legalCheckFields\` (
            \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT,
            \`legalCheckId\` int(10) unsigned NOT NULL,
            \`key\` varchar(255) NOT NULL,
            \`value\` text,
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            PRIMARY KEY (\`id\`),
            UNIQUE KEY \`legalCheckFieldsUniqueLegalCheckIdKey\` (\`legalCheckId\`,\`key\`),
            KEY \`fkLegalCheckFieldsLegalChecksIdx\` (\`legalCheckId\`),
            CONSTRAINT \`fkLegalCheckFieldsLegalChecks\` FOREIGN KEY (\`legalCheckId\`) REFERENCES \`legalChecks\` (\`id\`) ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`legalCheckFields\` DROP FOREIGN KEY \`fkLegalCheckFieldsLegalChecks\``);
    await queryRunner.query(`ALTER TABLE \`legalChecks\` DROP FOREIGN KEY \`fkLegalChecksProfiles\``);
    await queryRunner.query(`ALTER TABLE \`accountPeriodicUpdateFields\` DROP FOREIGN KEY \`accountperiodicupdatefields_accountperiodicupdateid_foreign\``);
    await queryRunner.query(`ALTER TABLE \`accountPeriodicUpdateFields\` DROP FOREIGN KEY \`accountperiodicupdatefields_accountid_foreign\``);
    await queryRunner.query(`ALTER TABLE \`accountPeriodicUpdates\` DROP FOREIGN KEY \`accountperiodicupdates_accountid_foreign\``);
    await queryRunner.query(`DROP INDEX \`legalCheckFieldsUniqueLegalCheckIdKey\` ON \`legalCheckFields\``);
    await queryRunner.query(`DROP INDEX \`fkLegalCheckFieldsLegalChecksIdx\` ON \`legalCheckFields\``);
    await queryRunner.query(`DROP TABLE \`legalCheckFields\``);
    await queryRunner.query(`DROP INDEX \`legalChecksUniqueAccountId\` ON \`legalChecks\``);
    await queryRunner.query(`DROP TABLE \`legalChecks\``);
    await queryRunner.query(`DROP INDEX \`documentsOwnerTypeOwnerId\` ON \`documents\``);
    await queryRunner.query(`DROP INDEX \`documentsOwnerIdIdx\` ON \`documents\``);
    await queryRunner.query(`DROP INDEX \`objectId\` ON \`documents\``);
    await queryRunner.query(`DROP TABLE \`documents\``);
    await queryRunner.query(`DROP INDEX \`accountperiodicupdatefields_id_unique\` ON \`accountPeriodicUpdateFields\``);
    await queryRunner.query(`DROP TABLE \`accountPeriodicUpdateFields\``);
    await queryRunner.query(`DROP INDEX \`accountperiodicupdates_id_unique\` ON \`accountPeriodicUpdates\``);
    await queryRunner.query(`DROP TABLE \`accountPeriodicUpdates\``);
  }

}
