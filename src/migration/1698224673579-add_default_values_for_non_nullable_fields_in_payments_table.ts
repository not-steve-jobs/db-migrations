import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultValuesForNonNullableFieldsInPaymentsTable1698224673579 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE `payments` MODIFY `originalPaymentId` VARCHAR(255) NOT NULL DEFAULT ''");
    await queryRunner.query("ALTER TABLE `payments` MODIFY `authPaymentId` VARCHAR(255) NOT NULL DEFAULT ''");
    await queryRunner.query("ALTER TABLE `payments` MODIFY `groupTransactionOrderId` VARCHAR(255) NOT NULL DEFAULT ''");
    await queryRunner.query('ALTER TABLE `payments` MODIFY `fee` decimal(20,4) NOT NULL DEFAULT 0');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `payments` MODIFY `originalPaymentId` VARCHAR(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `payments` MODIFY `authPaymentId` VARCHAR(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `payments` MODIFY `groupTransactionOrderId` VARCHAR(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `payments` MODIFY `fee` decimal(20,4) NOT NULL');
  }

}
