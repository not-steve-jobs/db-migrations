import path from 'path';
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { createList } from '../src/seedUtils';
import { isDevPlantLocalEnvironment } from '../src/environmentUtils';
import { Profiles } from '../entity/client/Profiles';
import { LegalChecks } from '../entity/legalChecks/LegalChecks';
import { LegalCheckFields } from '../entity/legalChecks/LegalCheckFields';
import { Clients } from '../entity/client/Clients';

import { client, legalCheck1, legalCheck2, legalCheckField, profile1, profile2 } from './data/14-LegalChecksServiceForDevLocalSeeder/legalChecksService';

export default class LegalChecksServiceForDevLocalSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    // These seeds are related to the integration-tests
    if (!isDevPlantLocalEnvironment()) {
      console.log(`Skipping seeds from ${path.basename(__filename)}`);
      return;
    }

    console.log(`Adding seeds from ${path.basename(__filename)}`);

    await createList(dataSource.manager, Profiles, [profile1, profile2]);
    await createList(dataSource.manager, LegalChecks, [legalCheck1, legalCheck2]);
    await createList(dataSource.manager, LegalCheckFields, [legalCheckField]);
    await createList(dataSource.manager, Clients, [client]);
  }
}
