import path from 'path';
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { createList } from '../src/seedUtils';
import { isDevPlantLocalEnvironment } from '../src/environmentUtils';
import { Profiles } from '../entity/client/Profiles';
import { ProfileFields } from '../entity/client/ProfileFields';

import {
  profileFieldsWithFailedStatusAndPassedScore,
  profileFieldsWithStatus,
  profileFieldsWithStatusAndScore,
  profileWithFailedStatusAndPassedScore,
  profileWithStatus,
  profileWithStatusAndScore,
} from './data/7-AcceptanceServiceForDevLocalSeeder/acceptanceService';

export default class AcceptanceServiceForDevLocalSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    // These seeds are related to the integration-tests
    if (!isDevPlantLocalEnvironment()) {
      console.log(`Skipping seeds from ${path.basename(__filename)}`);
      return;
    }

    console.log(`Adding seeds from ${path.basename(__filename)}`);

    await createList(dataSource.manager, Profiles, [
      profileWithStatusAndScore,
      profileWithFailedStatusAndPassedScore,
      profileWithStatus,
    ]);
    await createList(dataSource.manager, ProfileFields, [
      ...profileFieldsWithStatusAndScore,
      ...profileFieldsWithFailedStatusAndPassedScore,
      ...profileFieldsWithStatus,
    ]);
  }
}
