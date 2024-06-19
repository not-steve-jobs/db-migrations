import { MigrationInterface, QueryRunner } from 'typeorm';

import { runSqlQueries } from '../src/queryUtils';

import { getAuthoritiesInsertQueries } from './data/1684499809832-init-product/authorities';
import { getCountriesInsertQueries } from './data/1684499809832-init-product/countries';
import { getProductInsertQueries } from './data/1684499809832-init-product/products';
import { getProductsAvailabilityForPartnersInsertQueries } from './data/1684499809832-init-product/partnerProductsAvailability';
import { getProductsAvailabilityInsertQueries } from './data/1684499809832-init-product/productsAvailability';

export class InitProduct1684499809832 implements MigrationInterface {
  public name = 'InitProduct1684499809832';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`products\` (
          \`id\` int(10) NOT NULL AUTO_INCREMENT,
          \`name\` varchar(32) NOT NULL,
          \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
          PRIMARY KEY (\`id\`),
          UNIQUE KEY \`productsUniqueName\` (\`name\`),
          KEY \`productsNameIdx\` (\`name\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`countries\` (
          \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT,
          \`name\` varchar(255) NOT NULL,
          \`iso2\` varchar(2) NOT NULL,
          \`iso3\` varchar(3) NOT NULL,
          \`numeric\` int(11) NOT NULL,
          \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
          PRIMARY KEY (\`id\`),
          UNIQUE KEY \`countries_iso2_unique\` (\`iso2\`),
          UNIQUE KEY \`countries_iso3_unique\` (\`iso3\`),
          KEY \`countriesIso2Idx\` (\`iso2\`),
          KEY \`countriesIso3Idx\` (\`iso3\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`authorities\` (
          \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT,
          \`name\` varchar(255) NOT NULL,
          \`code\` varchar(255) NOT NULL,
          \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
          PRIMARY KEY (\`id\`),
          UNIQUE KEY \`authorities_code_unique\` (\`code\`),
          KEY \`authoritiesCodeIdx\` (\`code\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`productsAvailability\` (
            \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT,
            \`productName\` varchar(32) NOT NULL,
            \`countryIso2\` varchar(2) NOT NULL,
            \`authorityCode\` varchar(255) NOT NULL,
            \`status\` varchar(255) NOT NULL,
            \`isDefault\` tinyint(1) NOT NULL,
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            PRIMARY KEY (\`id\`),
            UNIQUE KEY \`productsAvailabilityUnqProductCountryAuthority\` (\`productName\`,\`countryIso2\`,\`authorityCode\`),
            KEY \`productsavailability_countryiso2_foreign\` (\`countryIso2\`),
            KEY \`productsavailability_authoritycode_foreign\` (\`authorityCode\`),
            CONSTRAINT \`productsavailability_authoritycode_foreign\` FOREIGN KEY (\`authorityCode\`) REFERENCES \`authorities\` (\`code\`),
            CONSTRAINT \`productsavailability_countryiso2_foreign\` FOREIGN KEY (\`countryIso2\`) REFERENCES \`countries\` (\`iso2\`),
            CONSTRAINT \`productsavailability_productname_foreign\` FOREIGN KEY (\`productName\`) REFERENCES \`products\` (\`name\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);

    await queryRunner.query(`
        CREATE TABLE \`professionalCategorizations\` (
            \`id\` char(36) NOT NULL,
            \`profileId\` char(36) NOT NULL,
            \`eligibleAnswersCount\` int(10) DEFAULT NULL,
            \`eligibleToBeProfessional\` tinyint(1) NOT NULL DEFAULT '0',
            \`approvedForAcceptance\` tinyint(1) NOT NULL DEFAULT '0',
            \`acceptanceSubmitted\` tinyint(1) NOT NULL DEFAULT '0',
            \`reassessmentRequested\` tinyint(1) NOT NULL DEFAULT '0',
            \`reassessmentSubmitted\` tinyint(1) NOT NULL DEFAULT '0',
            \`reassessmentAnswers\` text,
            \`acceptanceAnswers\` text,
            \`eligibleAnswers\` text,
            \`professionalSince\` timestamp(3) NULL DEFAULT NULL,
            \`reassessmentSubmittedOn\` timestamp(3) NULL DEFAULT NULL,
            \`acceptanceSubmittedOn\` timestamp(3) NULL DEFAULT NULL,
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            PRIMARY KEY (\`id\`),
            UNIQUE KEY \`professionalCategorizationsUniqueProfileId\` (\`profileId\`),
            KEY \`fkProfessionalCategorizationsProfilesIdx\` (\`profileId\`),
            CONSTRAINT \`fkProfessionalCategorizationsProfiles\` FOREIGN KEY (\`profileId\`) REFERENCES \`profiles\` (\`id\`) ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`scbProfessionalCategorizations\` (
            \`id\` char(36) NOT NULL,
            \`accountId\` char(36) DEFAULT NULL,
            \`eligibleAnswersCount\` int(10) DEFAULT NULL,
            \`eligibleToBeProfessional\` tinyint(1) NOT NULL DEFAULT '0',
            \`testCompleted\` tinyint(1) NOT NULL DEFAULT '0',
            \`testScore\` int(10) DEFAULT NULL,
            \`testCompletedOn\` timestamp(3) NULL DEFAULT NULL,
            \`testFailedOn\` timestamp(3) NULL DEFAULT NULL,
            \`selfCertificationAnswersCount\` int(10) DEFAULT NULL,
            \`selfCertificationCompleted\` tinyint(1) NOT NULL DEFAULT '0',
            \`selfCertificationCompletedOn\` timestamp(3) NULL DEFAULT NULL,
            \`acknowledgementCompleted\` tinyint(1) NOT NULL DEFAULT '0',
            \`acknowledgementCompletedOn\` timestamp(3) NULL DEFAULT NULL,
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            \`isLegacy\` tinyint(1) NOT NULL DEFAULT '0',
            \`isLegacyOn\` timestamp(3) NULL DEFAULT NULL,
            PRIMARY KEY (\`id\`),
            UNIQUE KEY \`scbprofessionalcategorizations_accountid_unique\` (\`accountId\`),
            CONSTRAINT \`scbprofessionalcategorizations_accountid_foreign\` FOREIGN KEY (\`accountId\`) REFERENCES \`profiles\` (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);

    console.log('Adding preset data to authorities');
    await runSqlQueries(getAuthoritiesInsertQueries(), queryRunner);

    console.log('Adding preset data to countries');
    await runSqlQueries(getCountriesInsertQueries(), queryRunner);

    console.log('Adding preset data to products');
    await runSqlQueries(getProductInsertQueries(), queryRunner);

    console.log('Adding preset data to productAvailabilities');
    await runSqlQueries(getProductsAvailabilityInsertQueries(), queryRunner);

    console.log('Adding preset data to productAvailabilities for partners');
    await runSqlQueries(getProductsAvailabilityForPartnersInsertQueries(), queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`productsAvailability\` DROP FOREIGN KEY \`productsavailability_productname_foreign\``);
    await queryRunner.query(`ALTER TABLE \`productsAvailability\` DROP FOREIGN KEY \`productsavailability_countryiso2_foreign\``);
    await queryRunner.query(`ALTER TABLE \`productsAvailability\` DROP FOREIGN KEY \`productsavailability_authoritycode_foreign\``);
    await queryRunner.query(`DROP INDEX \`productsAvailabilityUnqProductCountryAuthority\` ON \`productsAvailability\``);
    await queryRunner.query(`DROP TABLE \`productsAvailability\``);
    await queryRunner.query(`DROP INDEX \`authorities_code_unique\` ON \`authorities\``);
    await queryRunner.query(`DROP INDEX \`authoritiesCodeIdx\` ON \`authorities\``);
    await queryRunner.query(`DROP TABLE \`authorities\``);
    await queryRunner.query(`DROP INDEX \`countries_iso2_unique\` ON \`countries\``);
    await queryRunner.query(`DROP INDEX \`countries_iso3_unique\` ON \`countries\``);
    await queryRunner.query(`DROP INDEX \`countriesIso2Idx\` ON \`countries\``);
    await queryRunner.query(`DROP INDEX \`countriesIso3Idx\` ON \`countries\``);
    await queryRunner.query(`DROP TABLE \`countries\``);
    await queryRunner.query(`DROP INDEX \`productsUniqueName\` ON \`products\``);
    await queryRunner.query(`DROP INDEX \`productsNameIdx\` ON \`products\``);
    await queryRunner.query(`DROP TABLE \`products\``);

    await queryRunner.query(`ALTER TABLE \`scbProfessionalCategorizations\` DROP FOREIGN KEY \`scbprofessionalcategorizations_accountid_foreign\``);
    await queryRunner.query(`ALTER TABLE \`professionalCategorizations\` DROP FOREIGN KEY \`fkProfessionalCategorizationsProfiles\``);
    await queryRunner.query(`DROP INDEX \`scbprofessionalcategorizations_accountid_unique\` ON \`scbProfessionalCategorizations\``);
    await queryRunner.query(`DROP TABLE \`scbProfessionalCategorizations\``);
    await queryRunner.query(`DROP INDEX \`professionalCategorizationsUniqueProfileId\` ON \`professionalCategorizations\``);
    await queryRunner.query(`DROP INDEX \`fkProfessionalCategorizationsProfilesIdx\` ON \`professionalCategorizations\``);
    await queryRunner.query(`DROP TABLE \`professionalCategorizations\``);
  }

}
