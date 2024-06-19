import { MigrationInterface, QueryRunner } from 'typeorm';

import { tolerateQuery } from '../src/queryUtils';

export class DropGeolocation1704188767270 implements MigrationInterface {
  // These tables are no longer used, because geolocation-service has been disabled and deprecated.
  public readonly name = DropGeolocation1704188767270.name;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await tolerateQuery(queryRunner, `DROP TABLE \`geolocationVerifications\``);
    await tolerateQuery(queryRunner, `DROP TABLE \`geolocationAuthorities\``);
    await tolerateQuery(queryRunner, `DROP INDEX \`geolocationCountriesUniqueNumericCode\` ON \`geolocationCountries\``);
    await tolerateQuery(queryRunner, `DROP INDEX \`geolocationCountriesUniqueIsoCode3\` ON \`geolocationCountries\``);
    await tolerateQuery(queryRunner, `DROP INDEX \`geolocationCountriesUniqueIsoCode2\` ON \`geolocationCountries\``);
    await tolerateQuery(queryRunner, `DROP TABLE \`geolocationCountries\``);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    //
  }

}
