import path from 'path';
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { createList } from '../src/seedUtils';
import { isDevPlantLocalEnvironment } from '../src/environmentUtils';
import { Clients } from '../entity/client/Clients';
import { Profiles } from '../entity/client/Profiles';
import { AccountPeriodicUpdates } from '../entity/legalChecks/AccountPeriodicUpdates';
import { AccountPeriodicUpdateFields } from '../entity/legalChecks/AccountPeriodicUpdateFields';

import { accountPeriodicUpdateFields, accountPeriodicUpdates, client, profile } from './data/11-CustomerServiceForDevLocalSeeder/customerService';

export default class CustomerServiceForDevLocalSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    // These seeds are related to the integration-tests
    if (!isDevPlantLocalEnvironment()) {
      console.log(`Skipping seeds from ${path.basename(__filename)}`);
      return;
    }

    console.log(`Adding seeds from ${path.basename(__filename)}`);

    await createList(dataSource.manager, Clients, [client]);
    await createList(dataSource.manager, Profiles, [profile]);
    await createList(dataSource.manager, AccountPeriodicUpdates, [accountPeriodicUpdates]);
    await createList(dataSource.manager, AccountPeriodicUpdateFields, [accountPeriodicUpdateFields]);
  }
}
