import { MigrationInterface, QueryRunner } from 'typeorm';

import { runSqlQueries } from '../src/queryUtils';

import {
  getDeleteProductsAvailabilityForCorporateBankQuery,
  getInsertProductsAvailabilityForCorporateBankQuery,
} from './data/1686737466967-add-productAvailability-corporateBank/corporateBankProductsAvailability';

export class AddProductAvailabilityCorporateBank1686737466967 implements MigrationInterface {
  public name = AddProductAvailabilityCorporateBank1686737466967.name;

  public async up(queryRunner: QueryRunner): Promise<void> {

    const productInsertQuery = getInsertProductsAvailabilityForCorporateBankQuery();

    await runSqlQueries(productInsertQuery, queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const productDeleteQuery = getDeleteProductsAvailabilityForCorporateBankQuery({ productName: 'corporateBank' });

    await queryRunner.query(productDeleteQuery);
  }
}
