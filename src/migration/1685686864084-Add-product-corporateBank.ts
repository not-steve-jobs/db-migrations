import { MigrationInterface, QueryRunner } from 'typeorm';

import { getDeleteProductQuery, getInsertProductQuery } from './data/1685686864084-Add-product-corporateBank/products';

export class AddProductCorporateBank1685686864084 implements MigrationInterface {
  public name = AddProductCorporateBank1685686864084.name;
  public async up(queryRunner: QueryRunner): Promise<void> {
    const productInsertQuery = getInsertProductQuery({ name: 'corporateBank' });

    await queryRunner.query(productInsertQuery);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const productDeleteQuery = getDeleteProductQuery({ name: 'corporateBank' });

    await queryRunner.query(productDeleteQuery);
  }

}
