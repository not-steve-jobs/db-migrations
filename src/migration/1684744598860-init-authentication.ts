import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitAuthentication1684744598860 implements MigrationInterface {
  public name = 'InitAuthentication1684744598860';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`otps\` (
            \`id\` char(36) NOT NULL,
            \`accountId\` char(36) DEFAULT NULL,
            \`code\` int(6) NOT NULL,
            \`retries\` int(1) NOT NULL,
            \`target\` varchar(20) NOT NULL,
            \`isVerified\` tinyint(1) NOT NULL DEFAULT '0',
            \`tokenIsIssued\` tinyint(1) NOT NULL DEFAULT '0',
            \`token\` varchar(255) DEFAULT NULL,
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            PRIMARY KEY (\`id\`),
            KEY \`otps_accountid_foreign\` (\`accountId\`),
            CONSTRAINT \`otps_accountid_foreign\` FOREIGN KEY (\`accountId\`) REFERENCES \`profiles\` (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`authenticationTokens\` (
          \`id\` int(10) NOT NULL AUTO_INCREMENT,
          \`clientId\` char(36) NOT NULL,
          \`product\` varchar(64) DEFAULT NULL,
          \`accessToken\` varchar(1500) NOT NULL,
          \`refreshToken\` varchar(800) DEFAULT NULL,
          \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
          PRIMARY KEY (\`id\`),
          KEY \`authenticationTokensAccessTokenIdx\` (\`accessToken\`(255)),
          KEY \`authenticationTokensRefreshTokenIdx\` (\`refreshToken\`(255)),
          KEY \`authenticationTokensProductIdx\` (\`product\`),
          KEY \`fkAuthenticationTokensClientId\` (\`clientId\`),
          CONSTRAINT \`fkAuthenticationTokensClientId\` FOREIGN KEY (\`clientId\`) REFERENCES \`clients\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`mfaTokens\` (
            \`id\` int(10) NOT NULL AUTO_INCREMENT,
            \`authenticationTokenId\` int(10) NOT NULL,
            \`profileId\` char(36) NOT NULL,
            \`mfaToken\` char(36) NOT NULL,
            \`code\` int(10) NOT NULL,
            \`type\` varchar(16) NOT NULL,
            \`used\` tinyint(1) NOT NULL DEFAULT '0',
            \`expired\` tinyint(1) NOT NULL DEFAULT '0',
            \`expiredAt\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            PRIMARY KEY (\`id\`),
            KEY \`mfaTokensMfaTokenIdx\` (\`mfaToken\`),
            KEY \`fkMfaTokensProfileId\` (\`profileId\`),
            KEY \`fkMfaTokensAuthenticationTokenId\` (\`authenticationTokenId\`),
            CONSTRAINT \`fkMfaTokensAuthenticationTokenId\` FOREIGN KEY (\`authenticationTokenId\`)
              REFERENCES \`authenticationTokens\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT \`fkMfaTokensProfileId\` FOREIGN KEY (\`profileId\`)
              REFERENCES \`profiles\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`verificationCodes\` (
            \`id\` char(36) NOT NULL,
            \`clientId\` char(36) NOT NULL,
            \`code\` int(10) NOT NULL,
            \`status\` varchar(16) NOT NULL DEFAULT 'new',
            \`type\` varchar(15) NOT NULL DEFAULT 'passwordReset',
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            PRIMARY KEY (\`id\`),
            KEY \`verificationCodesClientIdCodeStatusIdx\` (\`clientId\`,\`code\`,\`status\`),
            CONSTRAINT \`fkVerificationCodesClientId\` FOREIGN KEY (\`clientId\`) REFERENCES \`clients\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`verificationCodes\` DROP FOREIGN KEY \`fkVerificationCodesClientId\``);
    await queryRunner.query(`ALTER TABLE \`mfaTokens\` DROP FOREIGN KEY \`fkMfaTokensProfileId\``);
    await queryRunner.query(`ALTER TABLE \`mfaTokens\` DROP FOREIGN KEY \`fkMfaTokensAuthenticationTokenId\``);
    await queryRunner.query(`ALTER TABLE \`authenticationTokens\` DROP FOREIGN KEY \`fkAuthenticationTokensClientId\``);
    await queryRunner.query(`ALTER TABLE \`otps\` DROP FOREIGN KEY \`otps_accountid_foreign\``);
    await queryRunner.query(`DROP INDEX \`verificationCodesClientIdCodeStatusIdx\` ON \`verificationCodes\``);
    await queryRunner.query(`DROP TABLE \`verificationCodes\``);
    await queryRunner.query(`DROP INDEX \`mfaTokensMfaTokenIdx\` ON \`mfaTokens\``);
    await queryRunner.query(`DROP TABLE \`mfaTokens\``);
    await queryRunner.query(`DROP INDEX \`authenticationTokensAccessTokenIdx\` ON \`authenticationTokens\``);
    await queryRunner.query(`DROP INDEX \`authenticationTokensRefreshTokenIdx\` ON \`authenticationTokens\``);
    await queryRunner.query(`DROP INDEX \`authenticationTokensProductIdx\` ON \`authenticationTokens\``);
    await queryRunner.query(`DROP TABLE \`authenticationTokens\``);
    await queryRunner.query(`DROP TABLE \`otps\``);
  }

}
