import path from 'path';
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { createList } from '../src/seedUtils';
import { isDevPlantLocalEnvironment } from '../src/environmentUtils';
import { Profiles } from '../entity/client/Profiles';
import { PaymentAccounts } from '../entity/payment/PaymentAccounts';
import { PaymentAccountFields } from '../entity/payment/PaymentAccountFields';

import {
  paymentAccount1, paymentAccount1Fields,
  paymentAccount2, paymentAccount2Fields,
  paymentAccount3,
  paymentAccount4,
  profile,
} from './data/9-PaymentAccountServiceForDevLocalSeeder/paymentAccountService';

export default class PaymentAccountServiceForDevLocalSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    // These seeds are related to the integration-tests
    if (!isDevPlantLocalEnvironment()) {
      console.log(`Skipping seeds from ${path.basename(__filename)}`);
      return;
    }

    console.log(`Adding seeds from ${path.basename(__filename)}`);

    await createList(dataSource.manager, Profiles, [profile]);
    await createList(dataSource.manager, PaymentAccounts, [
      paymentAccount1, paymentAccount2, paymentAccount3, paymentAccount4]);
    await createList(dataSource.manager, PaymentAccountFields, [
      ...paymentAccount1Fields, ...paymentAccount2Fields]);
  }
}
