import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitPayment1684489136896 implements MigrationInterface {
  public name = 'InitPayment1684489136896';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`configurationsService_providerPaymentMethods\` (
          \`id\` varchar(64) NOT NULL,
          \`paymentMethodName\` varchar(255) NOT NULL,
          \`paymentMethodCode\` varchar(255) NOT NULL,
          \`providerName\` varchar(255) NOT NULL,
          \`authority\` varchar(255) NOT NULL,
          \`currencies\` text NOT NULL,
          \`countries\` text NOT NULL,
          \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          \`updatedAt\` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`groupTransactions\` (
            \`id\` char(36) NOT NULL,
            \`reference\` varchar(255) NOT NULL,
            \`profileId\` char(36) NOT NULL,
            \`status\` varchar(32) NOT NULL,
            \`type\` varchar(16) NOT NULL,
            \`stp\` tinyint(1) DEFAULT NULL,
            \`stpDescription\` text,
            \`noCommission\` tinyint(1) NOT NULL DEFAULT '0',
            \`processingDescription\` varchar(255) DEFAULT NULL,
            \`riskFactor\` decimal(18,2) DEFAULT NULL,
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            \`paymentType\` varchar(255) DEFAULT NULL,
            \`paymentIntegrator\` varchar(255) DEFAULT '',
            \`linkedTo\` char(36) DEFAULT NULL,
            \`linkedType\` varchar(16) DEFAULT NULL,
            \`stpStatus\` varchar(32) DEFAULT NULL,
            PRIMARY KEY (\`id\`),
            UNIQUE KEY \`groupTransactionsUniqueReference\` (\`reference\`),
            KEY \`fkProfilesIdx\` (\`profileId\`),
            KEY \`fkGroupTransactionsLinkedTo\` (\`linkedTo\`),
            CONSTRAINT \`_fkGroupTransactionsLinkedTo\` FOREIGN KEY (\`linkedTo\`)
                REFERENCES \`groupTransactions\` (\`id\`) ON DELETE SET NULL ON UPDATE CASCADE,
            CONSTRAINT \`_fkProfilesIdx\` FOREIGN KEY (\`profileId\`)
                REFERENCES \`profiles\` (\`id\`) ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`groupTransactionFields\` (
            \`id\` varchar(64) NOT NULL,
            \`groupTransactionId\` char(36) NOT NULL,
            \`key\` varchar(255) NOT NULL,
            \`value\` mediumtext NOT NULL,
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            PRIMARY KEY (\`id\`),
            KEY \`fkGroupTransactionFieldsIdx\` (\`groupTransactionId\`),
            CONSTRAINT \`fkGroupTransactionFieldsIdx\` FOREIGN KEY (\`groupTransactionId\`) REFERENCES \`groupTransactions\` (\`id\`) ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`paymentAccounts\` (
            \`id\` varchar(64) NOT NULL,
            \`profileId\` char(36) NOT NULL,
            \`reference\` varchar(255) DEFAULT NULL,
            \`hash\` varchar(64) DEFAULT NULL,
            \`holderName\` varchar(255) DEFAULT NULL,
            \`paymentProviderAccountId\` varchar(255) DEFAULT NULL,
            \`paymentProvider\` varchar(255) DEFAULT NULL,
            \`processorName\` varchar(255) DEFAULT NULL,
            \`status\` varchar(16) NOT NULL,
            \`currency\` char(3) NOT NULL,
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`expiryDate\` varchar(64) DEFAULT NULL,
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            \`authority\` varchar(32) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
            PRIMARY KEY (\`id\`),
            KEY \`fkProfilePaymentAccountsIdx\` (\`profileId\`),
            CONSTRAINT \`fkProfilePaymentAccountsIdx\` FOREIGN KEY (\`profileId\`) REFERENCES \`profiles\` (\`id\`) ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`payments\` (
          \`id\` char(36) NOT NULL,
          \`state\` varchar(16) NOT NULL,
          \`status\` varchar(16) NOT NULL,
          \`provider\` varchar(255) NOT NULL,
          \`originalPaymentId\` varchar(255) NOT NULL,
          \`authPaymentId\` varchar(255) NOT NULL,
          \`groupTransactionOrderId\` varchar(255) NOT NULL,
          \`amount\` decimal(20,4) NOT NULL,
          \`currency\` char(3) NOT NULL,
          \`fee\` decimal(20,4) NOT NULL,
          \`refundableAmount\` decimal(20,4) DEFAULT NULL,
          \`merchantReference\` varchar(40) NOT NULL,
          \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
          \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
          PRIMARY KEY (\`id\`),
          UNIQUE KEY \`paymentsUniqueStateStatusProviderOriginalPaymentId\` (\`state\`,\`status\`,\`provider\`,\`originalPaymentId\`,\`merchantReference\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`paymentsTimeline\` (
            \`id\` int(10) NOT NULL AUTO_INCREMENT,
            \`paymentId\` char(36) NOT NULL,
            \`state\` varchar(16) NOT NULL,
            \`status\` varchar(16) NOT NULL,
            \`rawRequest\` text NOT NULL,
            \`rawResponse\` text NOT NULL,
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            PRIMARY KEY (\`id\`),
            KEY \`paymentsTimelineStateIdx\` (\`state\`),
            KEY \`paymentsTimelineStatusIdx\` (\`status\`),
            KEY \`fkPaymentsTimelinePayments\` (\`paymentId\`),
            CONSTRAINT \`fkPaymentsTimelinePayments\` FOREIGN KEY (\`paymentId\`) REFERENCES \`payments\` (\`id\`) ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`paymentAccountFields\` (
            \`id\` varchar(64) NOT NULL,
            \`paymentAccountId\` varchar(64) NOT NULL,
            \`key\` varchar(255) NOT NULL,
            \`value\` mediumtext NOT NULL,
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            PRIMARY KEY (\`id\`),
            KEY \`fkPaymentAccountIdx\` (\`paymentAccountId\`),
            CONSTRAINT \`fkPaymentAccountIdx\` FOREIGN KEY (\`paymentAccountId\`) REFERENCES \`paymentAccounts\` (\`id\`) ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`transactions\` (
            \`id\` varchar(64) NOT NULL,
            \`groupTransactionId\` char(36) NOT NULL,
            \`order\` int(10) NOT NULL,
            \`reference\` varchar(255) NOT NULL,
            \`accountType\` varchar(20) DEFAULT NULL,
            \`accountId\` varchar(64) NOT NULL,
            \`accountTransactionId\` varchar(255) DEFAULT NULL,
            \`profileId\` char(36) NOT NULL,
            \`status\` varchar(32) NOT NULL,
            \`type\` varchar(16) NOT NULL,
            \`refundableAmount\` decimal(20,4) DEFAULT NULL,
            \`currency\` char(3) DEFAULT NULL,
            \`amount\` decimal(20,4) DEFAULT NULL,
            \`feeAmount\` decimal(20,4) DEFAULT '0.0000',
            \`commissionAmount\` decimal(20,4) DEFAULT '0.0000',
            \`incomingCurrency\` char(3) DEFAULT NULL,
            \`incomingAmount\` decimal(20,4) DEFAULT NULL,
            \`currencyRate\` decimal(18,8) DEFAULT NULL,
            \`currencyRateSource\` varchar(255) DEFAULT NULL,
            \`refundedTransactionId\` varchar(64) DEFAULT NULL,
            \`checkoutId\` varchar(255) DEFAULT NULL,
            \`suspicious\` tinyint(1) NOT NULL DEFAULT '0',
            \`description\` varchar(255) DEFAULT NULL,
            \`dateProcessed\` timestamp(3) NULL DEFAULT NULL,
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            PRIMARY KEY (\`id\`),
            UNIQUE KEY \`transactionsUniqueReference\` (\`reference\`),
            KEY \`fkGroupTransactionIdx\` (\`groupTransactionId\`),
            KEY \`fkProfileTransactionsIdx\` (\`profileId\`),
            KEY \`transactionsAccountIdIdx\` (\`accountId\`),
            KEY \`transactionsRefundedTransactionIdIdx\` (\`refundedTransactionId\`),
            KEY \`transactionsAccountTransactionIdIdx\` (\`accountTransactionId\`),
            KEY \`transactionsCheckoutIdIdx\` (\`checkoutId\`),
            CONSTRAINT \`_fkGroupTransactionIdx\` FOREIGN KEY (\`groupTransactionId\`) REFERENCES \`groupTransactions\` (\`id\`) ON UPDATE CASCADE,
            CONSTRAINT \`fkProfileTransactionsIdx\` FOREIGN KEY (\`profileId\`) REFERENCES \`profiles\` (\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
    await queryRunner.query(`
        CREATE TABLE \`transactionFields\` (
            \`id\` varchar(64) NOT NULL,
            \`transactionId\` varchar(64) NOT NULL,
            \`key\` varchar(255) NOT NULL,
            \`value\` mediumtext NOT NULL,
            \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            PRIMARY KEY (\`id\`),
            KEY \`fkTransactionTransactionFieldsIdx\` (\`transactionId\`),
            CONSTRAINT \`fkTransactionTransactionFieldsIdx\` FOREIGN KEY (\`transactionId\`) REFERENCES \`transactions\` (\`id\`) ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`transactionFields\` DROP FOREIGN KEY \`fkTransactionTransactionFieldsIdx\``);
    await queryRunner.query(`ALTER TABLE \`transactions\` DROP FOREIGN KEY \`fkProfileTransactionsIdx\``);
    await queryRunner.query(`ALTER TABLE \`transactions\` DROP FOREIGN KEY \`fkGroupTransactionIdx\``);
    await queryRunner.query(`ALTER TABLE \`paymentAccountFields\` DROP FOREIGN KEY \`fkPaymentAccountIdx\``);
    await queryRunner.query(`ALTER TABLE \`paymentsTimeline\` DROP FOREIGN KEY \`fkPaymentsTimelinePayments\``);
    await queryRunner.query(`ALTER TABLE \`paymentAccounts\` DROP FOREIGN KEY \`fkProfilePaymentAccountsIdx\``);
    await queryRunner.query(`ALTER TABLE \`groupTransactionFields\` DROP FOREIGN KEY \`fkGroupTransactionFieldsIdx\``);
    await queryRunner.query(`ALTER TABLE \`groupTransactions\` DROP FOREIGN KEY \`fkProfilesIdx\``);
    await queryRunner.query(`ALTER TABLE \`groupTransactions\` DROP FOREIGN KEY \`fkGroupTransactionsLinkedTo\``);
    await queryRunner.query(`DROP TABLE \`transactionFields\``);
    await queryRunner.query(`DROP INDEX \`transactionsUniqueReference\` ON \`transactions\``);
    await queryRunner.query(`DROP INDEX \`transactionsAccountIdIdx\` ON \`transactions\``);
    await queryRunner.query(`DROP INDEX \`transactionsRefundedTransactionIdIdx\` ON \`transactions\``);
    await queryRunner.query(`DROP INDEX \`transactionsAccountTransactionIdIdx\` ON \`transactions\``);
    await queryRunner.query(`DROP INDEX \`transactionsCheckoutIdIdx\` ON \`transactions\``);
    await queryRunner.query(`DROP TABLE \`transactions\``);
    await queryRunner.query(`DROP TABLE \`paymentAccountFields\``);
    await queryRunner.query(`DROP INDEX \`paymentsTimelineStateIdx\` ON \`paymentsTimeline\``);
    await queryRunner.query(`DROP INDEX \`paymentsTimelineStatusIdx\` ON \`paymentsTimeline\``);
    await queryRunner.query(`DROP TABLE \`paymentsTimeline\``);
    await queryRunner.query(`DROP INDEX \`paymentsUniqueStateStatusProviderOriginalPaymentId\` ON \`payments\``);
    await queryRunner.query(`DROP TABLE \`payments\``);
    await queryRunner.query(`DROP TABLE \`paymentAccounts\``);
    await queryRunner.query(`DROP TABLE \`groupTransactionFields\``);
    await queryRunner.query(`DROP INDEX \`groupTransactionsUniqueReference\` ON \`groupTransactions\``);
    await queryRunner.query(`DROP TABLE \`groupTransactions\``);
    await queryRunner.query(`DROP TABLE \`configurationsService_providerPaymentMethods\``);
  }

}
