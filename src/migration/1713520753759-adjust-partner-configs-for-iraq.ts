import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustPartnerConfigsForIraq1713520753759 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO authorities (name, code)
      VALUES
        ('Saint Kitts and Nevis', 'knn')
      ON DUPLICATE KEY UPDATE name = values(name),
                              code = values(code);
    `);

    await queryRunner.query(`
      INSERT INTO productsAvailability (productName, countryIso2, authorityCode, status, isDefault)
      VALUES
        ('partners', 'IQ', 'knn', 'auto', 1),
        ('partners', 'IQ', 'lca', 'auto', 1)
      ON DUPLICATE KEY UPDATE productName = values(productName),
                              countryIso2 = values(countryIso2),
                              authorityCode = values(authorityCode);
    `);

    await queryRunner.query(`
      UPDATE productsAvailability
        SET status = 'auto'
        WHERE productName = 'partners' AND countryIso2 = 'IQ' AND authorityCode = 'gm';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DELETE FROM productsAvailability
      WHERE productName = 'partners'
      AND countryIso2 = 'IQ'
      AND (authorityCode = 'lca' OR authorityCode = 'knn');
  `);

    await queryRunner.query(`
      DELETE FROM authorities
      WHERE name = 'Saint Kitts and Nevis' AND code = 'knn';
    `);

    await queryRunner.query(`
      UPDATE productsAvailability
        SET status = 'restricted'
        WHERE productName = 'partners'
        AND countryIso2 = 'IQ'
        AND authorityCode = 'gm';
    `);
  }
}
