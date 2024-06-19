import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGroupTransactionsPaymentTypeIndex1708519376824 implements MigrationInterface {
  name = 'AddGroupTransactionsPaymentTypeIndex1708519376824';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER ONLINE TABLE groupTransactions ADD INDEX IF NOT EXISTS groupTransactionsPaymentTypeIdx (paymentType)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER ONLINE TABLE groupTransactions DROP INDEX IF EXISTS groupTransactionsPaymentTypeIdx`);
  }
}
