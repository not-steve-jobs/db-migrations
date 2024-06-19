import path from 'path';
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { createList } from '../src/seedUtils';
import { isDevPlantLocalEnvironment } from '../src/environmentUtils';
import { GroupTransactions } from '../entity/payment/GroupTransactions';
import { Transactions } from '../entity/payment/Transactions';

import { groupTransaction, transaction } from './data/12-GroupTransactionServiceForDevLocalSeeder/groupTransactionService';

export default class GroupTransactionServiceForDevLocalSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    // These seeds are related to the integration-tests
    if (!isDevPlantLocalEnvironment()) {
      console.log(`Skipping seeds from ${path.basename(__filename)}`);
      return;
    }

    console.log(`Adding seeds from ${path.basename(__filename)}`);

    await createList(dataSource.manager, GroupTransactions, [groupTransaction]);
    await createList(dataSource.manager, Transactions, [transaction]);
  }
}
