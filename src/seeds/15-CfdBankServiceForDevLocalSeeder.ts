import path from 'path';
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { createList } from '../src/seedUtils';
import { isDevPlantLocalEnvironment } from '../src/environmentUtils';
import { CfdBank } from '../entity/cfd/CfdBank';

import { cfdBank, cfdBank2, cfdBank3, cfdBank4 } from './data/15-CfdBankServiceForDevLocalSeeder/cfdBankService';

export default class CfdBankServiceForDevLocalSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    // These seeds are related to the integration-tests
    if (!isDevPlantLocalEnvironment()) {
      console.log(`Skipping seeds from ${path.basename(__filename)}`);
      return;
    }

    console.log(`Adding seeds from ${path.basename(__filename)}`);

    await createList(dataSource.manager, CfdBank, [cfdBank, cfdBank2, cfdBank3, cfdBank4]);
  }
}
