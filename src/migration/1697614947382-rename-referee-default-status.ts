import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameRefereeDefaultStatus1697614947382 implements MigrationInterface {
  public name = RenameRefereeDefaultStatus1697614947382.name;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`referees\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT 'participates'`
    );
    await queryRunner.query(
      `ALTER TABLE \`referrers\` CHANGE COLUMN \`createdAt\` \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)`
    );
    await queryRunner.query(
      `ALTER TABLE \`referrers\` CHANGE COLUMN \`updatedAt\` \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP`
    );
    await queryRunner.query(
      `ALTER TABLE \`referees\` CHANGE COLUMN \`createdAt\` \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)`
    );
    await queryRunner.query(
      `ALTER TABLE \`referees\` CHANGE COLUMN \`updatedAt\` \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP`
    );
    await queryRunner.query(`ALTER TABLE \`referees\` ADD \`didNotFulfillTheConditionsAt\` timestamp(3) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`referees\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT 'participated'`
    );
    await queryRunner.query(
      `ALTER TABLE \`referees\` CHANGE COLUMN \`updated\` \`updatedAt\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP`
    );
    await queryRunner.query(
      `ALTER TABLE \`referees\` CHANGE COLUMN \`created\` \`createdAt\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)`
    );
    await queryRunner.query(
      `ALTER TABLE \`referrers\` CHANGE COLUMN \`updated\` \`updatedAt\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP`
    );
    await queryRunner.query(
      `ALTER TABLE \`referrers\` CHANGE COLUMN \`created\` \`createdAt\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)`
    );
    await queryRunner.query(`ALTER TABLE \`referees\` DROP COLUMN \`didNotFulfillTheConditionsAt\``);
  }
}
