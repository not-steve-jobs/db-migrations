import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductsAvailabilityEnableLA1693383815204 implements MigrationInterface {
  public readonly name = 'ProductsAvailabilityEnableLA1693383815204';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        UPDATE productsAvailability
        SET authorityCode = 'fscm',
            status        = 'auto'
        WHERE productName = 'partners' and countryIso2 = 'LA'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        UPDATE productsAvailability
        SET authorityCode = 'gm',
            status        = 'restricted'
        WHERE productName = 'partners' and countryIso2 = 'LA'
    `);
  }
}
