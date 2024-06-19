import path from 'path';
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { createList } from '../src/seedUtils';
import { isDevPlantLocalEnvironment } from '../src/environmentUtils';
import { Profiles } from '../entity/client/Profiles';
import { ProfileFields } from '../entity/client/ProfileFields';
import { Accounts } from '../entity/cfd/Accounts';
import { Documents } from '../entity/legalChecks/Documents';
import { GlobalRestrictions } from '../entity/cfd/GlobalRestrictions';

import {
  adminAccount,
  adminProfile,
  adminProfileFields,
  documents,
  globalRestrictions,
  globalRestrictionsForCountry,
  globalRestrictionsForRiskAppetite,
  testAccount,
  testUserD1Profile,
  testUserD1ProfileFields,
  testUserProfile,
  testUserProfileFields,
} from './data/2-StorageApiForDevLocalSeeder/storageApiForDevLocal';

export default class StorageApiSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    if (!isDevPlantLocalEnvironment()) {
      console.log(`Skipping seeds from ${path.basename(__filename)}`);
      return;
    }

    console.log(`Adding seeds from ${path.basename(__filename)}`);

    await createList(dataSource.manager, Profiles, [adminProfile, testUserProfile, testUserD1Profile]);
    await createList(dataSource.manager, ProfileFields, [adminProfileFields, testUserProfileFields, testUserD1ProfileFields]);
    await createList(dataSource.manager, Accounts, [adminAccount, testAccount]);
    await createList(dataSource.manager, Documents, documents);
    await createList(dataSource.manager, GlobalRestrictions, globalRestrictions);
    await createList(dataSource.manager, GlobalRestrictions, globalRestrictionsForCountry);
    await createList(dataSource.manager, GlobalRestrictions, globalRestrictionsForRiskAppetite);
  }
}
