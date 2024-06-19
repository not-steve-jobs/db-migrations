import path from 'path';
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { createList } from '../src/seedUtils';
import { isDevPlantLocalEnvironment } from '../src/environmentUtils';
import { InvestAccounts } from '../entity/cfd/InvestAccounts';
import { Profiles } from '../entity/client/Profiles';

import { investAccount, profile } from './data/8-InvestAccountServiceForDevLocalSeeder/investAccountService';

export default class InvestAccountServiceForDevLocalSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    // These seeds are related to the integration-tests
    if (!isDevPlantLocalEnvironment()) {
      console.log(`Skipping seeds from ${path.basename(__filename)}`);
      return;
    }

    console.log(`Adding seeds from ${path.basename(__filename)}`);

    await createList(dataSource.manager, InvestAccounts, [investAccount]);
    await createList(dataSource.manager, Profiles, [profile]);
  }
}
