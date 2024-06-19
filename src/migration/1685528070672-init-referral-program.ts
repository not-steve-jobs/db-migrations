import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitReferralProgram1685528070672 implements MigrationInterface {
  public name = 'InitReferralProgram1685528070672';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`referrers\` (
          \`id\` bigint NOT NULL AUTO_INCREMENT,
          \`profileId\` char(36) NOT NULL,
          \`status\` varchar(255) NOT NULL,
          \`identifier\` int(2) NULL,
          \`eligibilityExpiration\` timestamp NOT NULL DEFAULT '2035-06-01 00:00:00',
          \`createdAt\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updatedAt\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE INDEX \`referrerIdentifierIdx\` (\`identifier\`),
        UNIQUE INDEX \`referrerProfileIdIdx\` (\`profileId\`),
        PRIMARY KEY (\`id\`),
        CONSTRAINT \`fkReferrersProfileId\` FOREIGN KEY (\`profileId\`) REFERENCES \`profiles\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`
    );

    await queryRunner.query(
      `CREATE TABLE \`referees\` (
          \`id\` bigint NOT NULL AUTO_INCREMENT,
          \`profileId\` char(36) NOT NULL,
          \`referrerId\` bigint(20) NOT NULL,
          \`status\` varchar(255) NOT NULL DEFAULT 'participated',
          \`createdAt\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updatedAt\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE INDEX \`refereeProfileIdIdx\` (\`profileId\`),
        PRIMARY KEY (\`id\`, \`referrerId\`),
        CONSTRAINT \`fkRefereesReferrerId\`
                FOREIGN KEY (\`referrerId\`) REFERENCES \`referrers\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT,
        CONSTRAINT \`fkRefereesProfileId\`
                FOREIGN KEY (\`profileId\`) REFERENCES \`profiles\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`referees\` DROP FOREIGN KEY \`fkRefereesProfileId\``
    );
    await queryRunner.query(
      `ALTER TABLE \`referees\` DROP FOREIGN KEY \`fkRefereesReferrerId\``
    );
    await queryRunner.query(
      `ALTER TABLE \`referrers\` DROP FOREIGN KEY \`fkReferrersProfileId\``
    );
    await queryRunner.query(`DROP INDEX \`refereeProfileIdIdx\` ON \`referees\``);
    await queryRunner.query(`DROP TABLE \`referees\``);
    await queryRunner.query(`DROP INDEX \`referrerIdentifierIdx\` ON \`referrers\``);
    await queryRunner.query(`DROP INDEX \`referrerProfileIdIdx\` ON \`referrers\``);
    await queryRunner.query(`DROP TABLE \`referrers\``);
  }
}
