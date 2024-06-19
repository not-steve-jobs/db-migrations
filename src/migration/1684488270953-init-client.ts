import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitClient1684488270953 implements MigrationInterface {
  public name = 'InitClient1684488270953';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`clients\` (
          \`id\` char(36) NOT NULL,
          \`email\` varchar(255) NOT NULL,
          \`passwordHash\` varchar(255) DEFAULT NULL,
          \`cif\` varchar(32) DEFAULT NULL,
          \`type\` varchar(255) NOT NULL,
          \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
          PRIMARY KEY (\`id\`),
          UNIQUE KEY \`email\` (\`email\`),
          UNIQUE KEY \`cif\` (\`cif\`),
          KEY \`clientsEmailIdx\` (\`email\`),
          KEY \`clientsCifIdx\` (\`cif\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`clientFields\` (
          \`id\` char(36) NOT NULL,
          \`clientId\` char(36) NOT NULL,
          \`key\` varchar(255) NOT NULL,
          \`value\` text,
          \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
          PRIMARY KEY (\`id\`),
          UNIQUE KEY \`clientFieldsUniqueClientIdKey\` (\`clientId\`,\`key\`),
          KEY \`fkClientFieldsClientsIdx\` (\`clientId\`),
          CONSTRAINT \`fkClientFieldsClients\` FOREIGN KEY (\`clientId\`) REFERENCES \`clients\` (\`id\`) ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`profiles\` (
          \`id\` char(36) NOT NULL,
          \`clientId\` char(36) DEFAULT NULL,
          \`email\` varchar(255) NOT NULL,
          \`authority\` varchar(32) NOT NULL,
          \`authType\` varchar(10) NOT NULL DEFAULT 'AUTH',
          \`country\` char(2) NOT NULL,
          \`passwordHash\` varchar(255) DEFAULT NULL,
          \`role\` varchar(255) NOT NULL,
          \`status\` varchar(255) NOT NULL,
          \`cif\` varchar(32) DEFAULT NULL,
          \`product\` varchar(64) NOT NULL DEFAULT 'cfd',
          \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
          PRIMARY KEY (\`id\`),
          UNIQUE KEY \`profilesUniqueEmailAuthorityProduct\` (\`email\`,\`authority\`,\`product\`),
          UNIQUE KEY \`cif\` (\`cif\`),
          KEY \`profilesEmailIdx\` (\`email\`),
          KEY \`profilesClientIdIdx\` (\`clientId\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`profileFields\` (
            \`id\` int(10) NOT NULL AUTO_INCREMENT,
            \`profileId\` char(36) NOT NULL,
            \`key\` varchar(255) NOT NULL,
            \`value\` mediumtext,
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            PRIMARY KEY (\`id\`),
            UNIQUE KEY \`profileFieldsUniqueProfileIdKey\` (\`profileId\`,\`key\`),
            KEY \`fkProfileFieldsProfilesIdx\` (\`profileId\`),
            CONSTRAINT \`fkProfileFieldsProfiles\` FOREIGN KEY (\`profileId\`) REFERENCES \`profiles\` (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`profileAppropriatenessAttempts\` (
          \`id\` int(10) NOT NULL AUTO_INCREMENT,
          \`profileId\` char(36) NOT NULL,
          \`score\` decimal(10,2) NOT NULL,
          \`created\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (\`id\`),
          KEY \`fkProfileAppropriatenessAttemptsProfilesIdx\` (\`profileId\`),
          CONSTRAINT \`fkProfileAppropriatenessAttemptsProfiles\` FOREIGN KEY (\`profileId\`) REFERENCES \`profiles\` (\`id\`) ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`profileNotifications\` (
            \`id\` char(36) NOT NULL,
            \`profileId\` char(36) NOT NULL,
            \`type\` varchar(255) NOT NULL,
            \`read\` tinyint(1) NOT NULL DEFAULT '0',
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            PRIMARY KEY (\`id\`),
            KEY \`fkProfileNotificationsProfilesIdx\` (\`profileId\`),
            CONSTRAINT \`fkProfileNotificationsProfiles\` FOREIGN KEY (\`profileId\`) REFERENCES \`profiles\` (\`id\`) ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`clientMigrations\` (
          \`id\` varchar(64) NOT NULL,
          \`profileId\` char(36) DEFAULT NULL,
          \`email\` varchar(255) NOT NULL,
          \`status\` varchar(255) NOT NULL,
          \`step\` int(10) NOT NULL,
          \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
          \`warnings\` text,
          PRIMARY KEY (\`id\`),
          UNIQUE KEY \`clientMigrationsUniqueEmail\` (\`email\`),
          KEY \`clientMigrationsProfileIdIdx\` (\`profileId\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`profileFields\` DROP FOREIGN KEY \`fkProfileFieldsProfiles\``);
    await queryRunner.query(`ALTER TABLE \`clientFields\` DROP FOREIGN KEY \`fkClientFieldsClients\``);
    await queryRunner.query(`DROP INDEX \`profileFieldsUniqueProfileIdKey\` ON \`profileFields\``);
    await queryRunner.query(`DROP INDEX \`fkProfileFieldsProfilesIdx\` ON \`profileFields\``);
    await queryRunner.query(`DROP TABLE \`profileFields\``);
    await queryRunner.query(`DROP INDEX \`profilesUniqueEmailAuthorityProduct\` ON \`profiles\``);
    await queryRunner.query(`DROP INDEX \`cif\` ON \`profiles\``);
    await queryRunner.query(`DROP INDEX \`profilesEmailIdx\` ON \`profiles\``);
    await queryRunner.query(`DROP INDEX \`profilesClientIdIdx\` ON \`profiles\``);
    await queryRunner.query(`DROP TABLE \`profiles\``);
    await queryRunner.query(`DROP INDEX \`clientFieldsUniqueClientIdKey\` ON \`clientFields\``);
    await queryRunner.query(`DROP INDEX \`fkClientFieldsClientsIdx\` ON \`clientFields\``);
    await queryRunner.query(`DROP TABLE \`clientFields\``);
    await queryRunner.query(`DROP INDEX \`email\` ON \`clients\``);
    await queryRunner.query(`DROP INDEX \`cif\` ON \`clients\``);
    await queryRunner.query(`DROP INDEX \`clientsEmailIdx\` ON \`clients\``);
    await queryRunner.query(`DROP INDEX \`clientsCifIdx\` ON \`clients\``);
    await queryRunner.query(`DROP TABLE \`clients\``);

    await queryRunner.query(`ALTER TABLE \`profileNotifications\` DROP FOREIGN KEY \`fkProfileNotificationsProfiles\``);
    await queryRunner.query(`DROP INDEX \`clientMigrationsUniqueEmail\` ON \`clientMigrations\``);
    await queryRunner.query(`DROP INDEX \`clientMigrationsProfileIdIdx\` ON \`clientMigrations\``);
    await queryRunner.query(`DROP TABLE \`clientMigrations\``);
    await queryRunner.query(`DROP INDEX \`fkProfileNotificationsProfilesIdx\` ON \`profileNotifications\``);
    await queryRunner.query(`DROP TABLE \`profileNotifications\``);
  }

}
