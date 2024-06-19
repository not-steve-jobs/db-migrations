import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGroupTransactionsUpdatedIndex1692167636378 implements MigrationInterface {
  public name = AddGroupTransactionsUpdatedIndex1692167636378.name;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE INDEX \`groupTransactionsUpdatedIdx\` ON \`groupTransactions\` (\`updated\`)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`groupTransactionsUpdatedIdx\` ON \`groupTransactions\``);
  }

}
