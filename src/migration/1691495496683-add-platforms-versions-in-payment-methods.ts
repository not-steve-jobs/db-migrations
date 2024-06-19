import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPlatformsVersionsInPaymentMethodsMigrationName1691495496683 implements MigrationInterface {
  public name = AddPlatformsVersionsInPaymentMethodsMigrationName1691495496683.name;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`configurationsService_providerPaymentMethods\` ADD \`isWebEnabled\` tinyint(1) NOT NULL DEFAULT '1'`);
    await queryRunner.query(`ALTER TABLE \`configurationsService_providerPaymentMethods\` ADD \`isIosEnabled\` tinyint(1) NOT NULL DEFAULT '1'`);
    await queryRunner.query(`ALTER TABLE \`configurationsService_providerPaymentMethods\` ADD \`minIosVersion\` varchar(32) NOT NULL DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE \`configurationsService_providerPaymentMethods\` ADD \`isAndroidEnabled\` tinyint(1) NOT NULL DEFAULT '1'`);
    await queryRunner.query(`ALTER TABLE \`configurationsService_providerPaymentMethods\` ADD \`minAndroidVersion\` varchar(32) NOT NULL DEFAULT '0'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`configurationsService_providerPaymentMethods\` DROP COLUMN \`minAndroidVersion\``);
    await queryRunner.query(`ALTER TABLE \`configurationsService_providerPaymentMethods\` DROP COLUMN \`isAndroidEnabled\``);
    await queryRunner.query(`ALTER TABLE \`configurationsService_providerPaymentMethods\` DROP COLUMN \`minIosVersion\``);
    await queryRunner.query(`ALTER TABLE \`configurationsService_providerPaymentMethods\` DROP COLUMN \`isIosEnabled\``);
    await queryRunner.query(`ALTER TABLE \`configurationsService_providerPaymentMethods\` DROP COLUMN \`isWebEnabled\``);
  }

}
