import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProviderMethodFieldsAdminApiNullable1699258431338 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Some comment here
    /*
    * some comment
    */
    await queryRunner.query(`
          DELETE tbl1
          FROM table1 tbl1
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE from tbl1 where field1 is null`);
  }
}
