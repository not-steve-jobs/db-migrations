import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitGeolocation1684240679468 implements MigrationInterface {
  public name = 'InitGeolocation1684240679468';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`geolocationCountries\` (
          \`id\` bigint(20) NOT NULL AUTO_INCREMENT,
          \`countryName\` varchar(255) DEFAULT NULL,
          \`isoCode2\` varchar(255) DEFAULT NULL,
          \`isoCode3\` varchar(255) DEFAULT NULL,
          \`numericCode\` int(11) NOT NULL,
          \`status\` varchar(255) DEFAULT NULL,
          PRIMARY KEY (\`id\`),
          UNIQUE KEY \`geolocationCountriesUniqueNumericCode\` (\`numericCode\`),
          UNIQUE KEY \`geolocationCountriesUniqueIsoCode2\` (\`isoCode2\`),
          UNIQUE KEY \`geolocationCountriesUniqueIsoCode3\` (\`isoCode3\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`geolocationAuthorities\` (
          \`id\` bigint(20) NOT NULL AUTO_INCREMENT,
          \`isoCode2\` varchar(255) DEFAULT NULL,
          \`key\` varchar(255) DEFAULT NULL,
          \`order\` int(11) NOT NULL,
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`geolocationVerifications\` (
          \`id\` bigint(20) NOT NULL AUTO_INCREMENT,
          \`authority\` varchar(255) DEFAULT NULL,
          \`isoCode2\` varchar(255) DEFAULT NULL,
          \`key\` varchar(255) DEFAULT NULL,
          \`type\` varchar(255) DEFAULT NULL,
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`geolocationVerifications\``);
    await queryRunner.query(`DROP TABLE \`geolocationAuthorities\``);
    await queryRunner.query(`DROP INDEX \`geolocationCountriesUniqueNumericCode\` ON \`geolocationCountries\``);
    await queryRunner.query(`DROP INDEX \`geolocationCountriesUniqueIsoCode3\` ON \`geolocationCountries\``);
    await queryRunner.query(`DROP INDEX \`geolocationCountriesUniqueIsoCode2\` ON \`geolocationCountries\``);
    await queryRunner.query(`DROP TABLE \`geolocationCountries\``);
  }

}
