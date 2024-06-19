import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTransactionsIncreaseDescriptionLength1706280240455 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE \`transactions\` MODIFY COLUMN \`description\` varchar(510) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL');
    // On production, we used percona-toolkit which has this side effect :
    // https://docs.percona.com/percona-toolkit/pt-online-schema-change.html#:~:text=which%20adds%20a-,leading%20underscore,-to%20the%20name
    await queryRunner.query(`ALTER TABLE \`transactions\` DROP FOREIGN KEY \`fkProfileTransactionsIdx\``);
    await queryRunner.query(`ALTER TABLE \`transactions\` DROP FOREIGN KEY \`_fkGroupTransactionIdx\``);
    await queryRunner.query(`ALTER TABLE \`transactions\` ADD CONSTRAINT \`_fkProfileTransactionsIdx\`
        FOREIGN KEY (\`profileId\`) REFERENCES \`profiles\`(\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE \`transactions\` ADD CONSTRAINT \`__fkGroupTransactionIdx\`
        FOREIGN KEY (\`groupTransactionId\`) REFERENCES \`groupTransactions\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE transactions MODIFY COLUMN description varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL');
    await queryRunner.query(`ALTER TABLE \`transactions\` DROP FOREIGN KEY \`_fkProfileTransactionsIdx\``);
    await queryRunner.query(`ALTER TABLE \`transactions\` DROP FOREIGN KEY \`__fkGroupTransactionIdx\``);
    await queryRunner.query(`ALTER TABLE \`transactions\` ADD CONSTRAINT \`fkProfileTransactionsIdx\`
        FOREIGN KEY (\`profileId\`) REFERENCES \`profiles\`(\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE \`transactions\` ADD CONSTRAINT \`_fkGroupTransactionIdx\`
        FOREIGN KEY (\`groupTransactionId\`) REFERENCES \`groupTransactions\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
  }

}
