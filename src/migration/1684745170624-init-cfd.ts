import { MigrationInterface, QueryRunner } from 'typeorm';

import { runSqlQueries } from '../src/queryUtils';

import { getActivitiesInsertQueries } from './data/1684745170624-init-cfd/activities';

export class InitCfd1684745170624 implements MigrationInterface {
  public name = 'InitCfd1684745170624';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`accounts\` (
          \`id\` char(36) NOT NULL,
          \`profileId\` char(36) NOT NULL,
          \`login\` varchar(255) NOT NULL,
          \`platform\` varchar(64) NOT NULL,
          \`platformName\` varchar(128) DEFAULT NULL,
          \`server\` varchar(255) NOT NULL,
          \`type\` varchar(32) NOT NULL DEFAULT 'real',
          \`group\` varchar(64) DEFAULT NULL,
          \`serverType\` varchar(16) DEFAULT NULL,
          \`currency\` char(3) DEFAULT NULL,
          \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
          \`partnership\` varchar(256) NOT NULL,
          \`status\` char(16) NOT NULL,
          \`substatus\` char(32) NOT NULL DEFAULT '',
          \`supportsLeverage\` tinyint(1) NOT NULL DEFAULT '1',
          \`lastUpdateHash\` varchar(255) DEFAULT NULL,
          \`sendReports\` tinyint(1) NOT NULL DEFAULT '0',
          \`depositLimitReached\` tinyint(1) DEFAULT NULL,
          \`autoApprovalLegalChecks\` tinyint(1) NOT NULL DEFAULT '0',
          PRIMARY KEY (\`id\`),
          UNIQUE KEY \`accountsUniqueLoginServer\` (\`login\`,\`server\`),
          KEY \`fkAccountProfilesIdx\` (\`profileId\`),
          CONSTRAINT \`fkAccountsProfiles\` FOREIGN KEY (\`profileId\`) REFERENCES \`profiles\` (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`identities\` (
            \`id\` int(10) NOT NULL AUTO_INCREMENT,
            \`oid\` char(36) NOT NULL,
            \`clientId\` char(36) NOT NULL,
            \`accountId\` char(36) NOT NULL,
            \`productId\` int(10) NOT NULL,
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            PRIMARY KEY (\`id\`),
            UNIQUE KEY \`identitiesUniqueOidClientIdAccountId\` (\`oid\`,\`clientId\`,\`accountId\`),
            KEY \`fkIdentitiesClients\` (\`clientId\`),
            KEY \`fkIdentitiesProfiles\` (\`accountId\`),
            KEY \`fkIdentitiesProducts\` (\`productId\`),
            CONSTRAINT \`fkIdentitiesClients\` FOREIGN KEY (\`clientId\`) REFERENCES \`clients\` (\`id\`) ON UPDATE CASCADE,
            CONSTRAINT \`fkIdentitiesProducts\` FOREIGN KEY (\`productId\`) REFERENCES \`products\` (\`id\`) ON UPDATE CASCADE,
            CONSTRAINT \`fkIdentitiesProfiles\` FOREIGN KEY (\`accountId\`) REFERENCES \`profiles\` (\`id\`) ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`cfdBank\` (
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
          UNIQUE KEY \`cfdbank_id_unique\` (\`id\`),
          UNIQUE KEY \`cfdbank_reference_unique\` (\`reference\`),
          UNIQUE KEY \`cfdbank_login_server_unique\` (\`login\`,\`server\`),
          KEY \`cfdBankAccountIdIdx\` (\`accountId\`),
          KEY \`cfdBankCreatedIdx\` (\`created\`),
          CONSTRAINT \`cfdbank_accountid_foreign\` FOREIGN KEY (\`accountId\`) REFERENCES \`profiles\` (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`globalRestrictions\` (
          \`id\` char(36) NOT NULL,
          \`authority\` varchar(32) NOT NULL,
          \`country\` char(2) NOT NULL DEFAULT '',
          \`appropriateness\` varchar(255) NOT NULL DEFAULT '',
          \`clientType\` varchar(255) NOT NULL DEFAULT '',
          \`riskAppetite\` varchar(16) NOT NULL DEFAULT '',
          \`restrictions\` text NOT NULL,
          \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
          \`profileStatus\` varchar(36) NOT NULL DEFAULT '',
          PRIMARY KEY (\`id\`),
          UNIQUE KEY \`globalRestrictionsUnique\` (\`authority\`,\`country\`,\`appropriateness\`,\`clientType\`,\`profileStatus\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`ibans\` (
          \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT,
          \`number\` varchar(34) NOT NULL,
          \`rawResponse\` text NOT NULL,
          \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
          PRIMARY KEY (\`id\`),
          UNIQUE KEY \`ibans_number_unique\` (\`number\`),
          KEY \`numberIdx\` (\`number\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`activities\` (
          \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT,
          \`productName\` varchar(32) NOT NULL,
          \`authorityCode\` varchar(255) DEFAULT NULL,
          \`countryIso2\` varchar(2) DEFAULT NULL,
          \`order\` int(11) NOT NULL,
          \`key\` varchar(255) NOT NULL,
          \`skip\` tinyint(1) NOT NULL,
          \`enabled\` tinyint(1) NOT NULL,
          \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
          PRIMARY KEY (\`id\`),
          KEY \`activities_productname_foreign\` (\`productName\`),
          KEY \`activities_authoritycode_foreign\` (\`authorityCode\`),
          KEY \`activities_countryiso2_foreign\` (\`countryIso2\`),
          CONSTRAINT \`activities_authoritycode_foreign\` FOREIGN KEY (\`authorityCode\`) REFERENCES \`authorities\` (\`code\`) ON UPDATE CASCADE,
          CONSTRAINT \`activities_countryiso2_foreign\` FOREIGN KEY (\`countryIso2\`) REFERENCES \`countries\` (\`iso2\`) ON UPDATE CASCADE,
          CONSTRAINT \`activities_productname_foreign\` FOREIGN KEY (\`productName\`) REFERENCES \`products\` (\`name\`) ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`accountStates\` (
          \`id\` int(10) NOT NULL AUTO_INCREMENT,
          \`accountId\` char(36) NOT NULL,
          \`entityId\` char(36) NOT NULL,
          \`entityType\` char(36) NOT NULL,
          \`key\` varchar(255) NOT NULL,
          \`value\` text NOT NULL,
          \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
          PRIMARY KEY (\`id\`),
          UNIQUE KEY \`accountStatesUniqueProfileIdEntityComplexKey\` (\`accountId\`,\`entityId\`,\`entityType\`,\`key\`),
          KEY \`fkAccountStatesProfileIdx\` (\`accountId\`),
          CONSTRAINT \`fkAccountStatesProfile\` FOREIGN KEY (\`accountId\`) REFERENCES \`profiles\` (\`id\`) ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`relations\` (
          \`id\` char(36) NOT NULL,
          \`type\` varchar(16) NOT NULL DEFAULT 'poa',
          \`profileId\` char(36) NOT NULL,
          \`attorneyId\` char(36) NOT NULL,
          \`objectId\` char(36) NOT NULL,
          \`objectType\` varchar(64) NOT NULL,
          \`status\` varchar(16) NOT NULL,
          \`permission\` varchar(64) NOT NULL,
          \`stp\` varchar(64) NOT NULL,
          \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
          PRIMARY KEY (\`id\`),
          KEY \`relationsProfileIdx\` (\`profileId\`),
          KEY \`relationsAttorneyIdx\` (\`attorneyId\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`tins\` (
            \`id\` char(36) NOT NULL,
            \`clientId\` char(36) NOT NULL,
            \`country\` char(2) DEFAULT NULL,
            \`isUsTaxResident\` tinyint(1) DEFAULT NULL,
            \`tin\` varchar(255) DEFAULT NULL,
            \`isValid\` tinyint(1) NOT NULL DEFAULT '0',
            \`isFormSigned\` tinyint(1) DEFAULT '0',
            \`formType\` varchar(255) DEFAULT NULL,
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            PRIMARY KEY (\`id\`),
            UNIQUE KEY \`tins_id_unique\` (\`id\`),
            UNIQUE KEY \`tins_clientid_country_tin_unique\` (\`clientId\`,\`country\`,\`tin\`),
            CONSTRAINT \`tins_clientid_foreign\` FOREIGN KEY (\`clientId\`) REFERENCES \`clients\` (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`swifts\` (
          \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT,
          \`number\` varchar(34) NOT NULL,
          \`rawResponse\` text NOT NULL,
          \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
          PRIMARY KEY (\`id\`),
          UNIQUE KEY \`swift_number_unique\` (\`number\`),
          KEY \`numberIdx\` (\`number\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`wallets\` (
            \`id\` char(36) NOT NULL,
            \`profileId\` char(36) NOT NULL,
            \`reference\` varchar(255) NOT NULL,
            \`currency\` char(3) NOT NULL,
            \`status\` char(16) NOT NULL,
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`accountLogin\` varchar(255) NOT NULL,
            \`server\` varchar(255) NOT NULL,
            \`group\` varchar(64) NOT NULL,
            \`partnership\` varchar(256) NOT NULL,
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            \`substatus\` char(32) NOT NULL DEFAULT '',
            \`lastUpdateHash\` varchar(255) DEFAULT NULL,
            PRIMARY KEY (\`id\`),
            UNIQUE KEY \`walletsUniqueCurrencyProfileId\` (\`currency\`,\`profileId\`),
            UNIQUE KEY \`walletsUniqueLoginServer\` (\`accountLogin\`,\`server\`),
            KEY \`fkWalletsIdx\` (\`profileId\`),
            CONSTRAINT \`fkWalletsProfiles\` FOREIGN KEY (\`profileId\`) REFERENCES \`profiles\` (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);

    console.log('Adding preset data to activities');
    await runSqlQueries(getActivitiesInsertQueries(), queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`wallets\` DROP FOREIGN KEY \`fkWalletsProfiles\``);
    await queryRunner.query(`ALTER TABLE \`tins\` DROP FOREIGN KEY \`tins_clientid_foreign\``);
    await queryRunner.query(`ALTER TABLE \`accountStates\` DROP FOREIGN KEY \`fkAccountStatesProfile\``);
    await queryRunner.query(`ALTER TABLE \`activities\` DROP FOREIGN KEY \`activities_productname_foreign\``);
    await queryRunner.query(`ALTER TABLE \`activities\` DROP FOREIGN KEY \`activities_countryiso2_foreign\``);
    await queryRunner.query(`ALTER TABLE \`activities\` DROP FOREIGN KEY \`activities_authoritycode_foreign\``);
    await queryRunner.query(`ALTER TABLE \`cfdBank\` DROP FOREIGN KEY \`cfdbank_accountid_foreign\``);
    await queryRunner.query(`ALTER TABLE \`identities\` DROP FOREIGN KEY \`fkIdentitiesProfiles\``);
    await queryRunner.query(`ALTER TABLE \`identities\` DROP FOREIGN KEY \`fkIdentitiesProducts\``);
    await queryRunner.query(`ALTER TABLE \`identities\` DROP FOREIGN KEY \`fkIdentitiesClients\``);
    await queryRunner.query(`ALTER TABLE \`accounts\` DROP FOREIGN KEY \`fkAccountsProfiles\``);
    await queryRunner.query(`DROP INDEX \`walletsUniqueCurrencyProfileId\` ON \`wallets\``);
    await queryRunner.query(`DROP INDEX \`walletsUniqueLoginServer\` ON \`wallets\``);
    await queryRunner.query(`DROP INDEX \`fkWalletsIdx\` ON \`wallets\``);
    await queryRunner.query(`DROP TABLE \`wallets\``);
    await queryRunner.query(`DROP INDEX \`swift_number_unique\` ON \`swifts\``);
    await queryRunner.query(`DROP INDEX \`numberIdx\` ON \`swifts\``);
    await queryRunner.query(`DROP TABLE \`swifts\``);
    await queryRunner.query(`DROP INDEX \`tins_id_unique\` ON \`tins\``);
    await queryRunner.query(`DROP INDEX \`tins_clientid_country_tin_unique\` ON \`tins\``);
    await queryRunner.query(`DROP TABLE \`tins\``);
    await queryRunner.query(`DROP INDEX \`relationsProfileIdx\` ON \`relations\``);
    await queryRunner.query(`DROP INDEX \`relationsAttorneyIdx\` ON \`relations\``);
    await queryRunner.query(`DROP TABLE \`relations\``);
    await queryRunner.query(`DROP INDEX \`accountStatesUniqueProfileIdEntityComplexKey\` ON \`accountStates\``);
    await queryRunner.query(`DROP INDEX \`fkAccountStatesProfileIdx\` ON \`accountStates\``);
    await queryRunner.query(`DROP TABLE \`accountStates\``);
    await queryRunner.query(`DROP TABLE \`activities\``);
    await queryRunner.query(`DROP INDEX \`ibans_number_unique\` ON \`ibans\``);
    await queryRunner.query(`DROP INDEX \`numberIdx\` ON \`ibans\``);
    await queryRunner.query(`DROP TABLE \`ibans\``);
    await queryRunner.query(`DROP INDEX \`globalRestrictionsUnique\` ON \`globalRestrictions\``);
    await queryRunner.query(`DROP TABLE \`globalRestrictions\``);
    await queryRunner.query(`DROP INDEX \`cfdbank_id_unique\` ON \`cfdBank\``);
    await queryRunner.query(`DROP INDEX \`cfdbank_reference_unique\` ON \`cfdBank\``);
    await queryRunner.query(`DROP INDEX \`cfdbank_login_server_unique\` ON \`cfdBank\``);
    await queryRunner.query(`DROP INDEX \`cfdBankAccountIdIdx\` ON \`cfdBank\``);
    await queryRunner.query(`DROP INDEX \`cfdBankCreatedIdx\` ON \`cfdBank\``);
    await queryRunner.query(`DROP TABLE \`cfdBank\``);
    await queryRunner.query(`DROP INDEX \`identitiesUniqueOidClientIdAccountId\` ON \`identities\``);
    await queryRunner.query(`DROP TABLE \`identities\``);
    await queryRunner.query(`DROP INDEX \`accountsUniqueLoginServer\` ON \`accounts\``);
    await queryRunner.query(`DROP INDEX \`fkAccountProfilesIdx\` ON \`accounts\``);
    await queryRunner.query(`DROP TABLE \`accounts\``);
  }

}
