import path from 'path';
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { createList } from '../src/seedUtils';
import { isDevPlantLocalEnvironment } from '../src/environmentUtils';
import { Accounts } from '../entity/cfd/Accounts';
import { Wallets } from '../entity/cfd/Wallets';
import { Profiles } from '../entity/client/Profiles';

import { account, profile1, profile2, wallet } from './data/13-TradingAccountServiceForDevLocalSeeder/tradingAccountService';

export default class TradingAccountServiceForDevLocalSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    // These seeds are related to the integration-tests
    if (!isDevPlantLocalEnvironment()) {
      console.log(`Skipping seeds from ${path.basename(__filename)}`);
      return;
    }

    console.log(`Adding seeds from ${path.basename(__filename)}`);

    await createList(dataSource.manager, Profiles, [profile1, profile2]);
    await createList(dataSource.manager, Accounts, [account]);
    await createList(dataSource.manager, Wallets, [wallet]);
  }
}
