#!/usr/bin/env node
import { join } from 'path';
import { config, exec } from 'shelljs';

config.fatal = true; // To exit when error occurs

const customCliExtension = join(__dirname, '../custom-cli-extension.js');
const customCli = join(__dirname, '../custom-cli.js');

exec(`COUNTER_GENERATOR=1 node ${ customCliExtension } db:drop`);
exec(`COUNTER_GENERATOR=1 node ${ customCliExtension } db:create`);
exec(`COUNTER_GENERATOR=1 node ${ customCli } query '${ getMigrationsForCounterGenerator() }'`, { silent: true });
exec(`COUNTER_GENERATOR=1 node ${ customCli } query '${ getSeedsForCounterGenerator() }'`, { silent: true });

function getMigrationsForCounterGenerator(): string {
  return `
    CREATE TABLE counters (
      \`key\`   VARCHAR(128)    NOT NULL,
      value BIGINT UNSIGNED NOT NULL,
      PRIMARY KEY (\`key\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

    CREATE PROCEDURE GetCounter(IN \`counterKey\` VARCHAR(128))
      BEGIN
        DECLARE nextValue BIGINT UNSIGNED;
        START TRANSACTION;
          SELECT COALESCE(MAX(value), 0) + 1
            INTO nextValue
            FROM counters
            WHERE \`key\` = counterKey FOR UPDATE;

          REPLACE \`counters\` SET \`key\` = counterKey, value = nextValue;
          SELECT nextValue;
        COMMIT;
      END;
  `;
}

function getSeedsForCounterGenerator(): string {
  return `
    insert into counters (\`key\`, value) VALUES
        ('\\''mw.client-api.clientRegistrationOrder'\\'', 245244),
        ('\\''mw.client-api.registrationOrder'\\'', 198761),
        ('\\''mw.expayPaymentAccountReferenceNumber'\\'', 461),
        ('\\''mw.groupTransactionReferenceNumber'\\'', 3000000001000331),
        ('\\''mw.investAccountReferenceNumber'\\'', 18),
        ('\\''mw.cfdBankReferenceNumber'\\'', 1),
        ('\\''mw.mw.client-api.wallet'\\'', 568522),
        ('\\''mw.netbanxPaymentAccountReferenceNumber'\\'', 8142),
        ('\\''mw.nganluongPaymentAccountReferenceNumber'\\'', 3958),
        ('\\''mw.paysecPaymentAccountReferenceNumber'\\'', 3001),
        ('\\''mw.shared.cifGeneratorTest'\\'', 9565),
        ('\\''mw.test.concurrent'\\'', 655031),
        ('\\''mw.test.counter'\\'', 3001),
        ('\\''mw.testCounterForReferences'\\'', 6647),
        ('\\''mw.transactionReferenceNumber'\\'', 3000000001798561),
        ('\\''mw.xpayPaymentAccountReferenceNumber'\\'', 154),
        ('\\''mw.zotapayPaymentAccountReferenceNumber'\\'', 11186)
    ;
  `;
}
