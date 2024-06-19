import path from 'path';
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { createList } from '../src/seedUtils';
import { isDevPlantLocalEnvironment, isQaPlantOrMockEnvironment } from '../src/environmentUtils';
import {
  cp_Authorities,
  cp_Countries,
  cp_CountriesAuthorities,
  cp_CountryAuthorityMethods,
  cp_Currencies,
  cp_Fields,
  cp_Methods,
  cp_ProviderMethods,
  cp_Providers,
  cp_TransactionConfigs,
} from '../entity/payments-configurator';
import { cp_ProviderFields } from '../entity/payments-configurator/cp_ProviderFields';

import {
  authorities,
  countries,
  countriesAuthorities,
  currencies,
  fields,
  methods,
  countryAuthorityMethods,
  transactionConfigs,
  providerMethods,
  providers,
} from './data/5-PaymentsConfiguratorManagementServiceForDevLocalSeeder';
import { providerFields } from './data/5-PaymentsConfiguratorManagementServiceForDevLocalSeeder/providerFields';

export default class ConfiguratorSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    if (!isDevPlantLocalEnvironment() && !isQaPlantOrMockEnvironment()) {
      console.log(`Skipping seeds from ${path.basename(__filename)}`);
      return;
    }

    console.log(`Adding seeds from ${path.basename(__filename)}`);

    await createList(dataSource.manager, cp_Authorities, authorities);
    await createList(dataSource.manager, cp_Countries, countries);
    await createList(dataSource.manager, cp_CountriesAuthorities, countriesAuthorities);
    await createList(dataSource.manager, cp_Methods, methods);
    await createList(dataSource.manager, cp_Currencies, currencies);
    await createList(dataSource.manager, cp_CountryAuthorityMethods, countryAuthorityMethods);
    await createList(dataSource.manager, cp_Providers, providers);
    await createList(dataSource.manager, cp_ProviderMethods, providerMethods);
    await createList(dataSource.manager, cp_TransactionConfigs, transactionConfigs);
    await createList(dataSource.manager, cp_Fields, fields);
    await createList(dataSource.manager, cp_ProviderFields, providerFields);
  }
}
