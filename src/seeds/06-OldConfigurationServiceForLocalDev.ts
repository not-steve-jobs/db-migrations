import fs from 'fs';
import path from 'path';
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { isDevPlantLocalEnvironment, isQaPlantOrMockEnvironment } from '../src/environmentUtils';

export default class OldConfigurationServiceForLocalDev implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    if (!isDevPlantLocalEnvironment() && !isQaPlantOrMockEnvironment()) {
      console.log(`Skipping seeds from ${path.basename(__filename)}`);
      return;
    }

    console.log(`Adding seeds from ${path.basename(__filename)}`);

    const globalRestrictionsForQAPlant = path.join(__dirname,
      '../../assets/seeds/6-OldConfigurationServiceForLocalDev/providerPaymentMethods.sql');
    const queryRunner = dataSource.createQueryRunner();

    const queries = fs.readFileSync(globalRestrictionsForQAPlant).toString();
    try {
      await queryRunner.query(queries);
    } catch (e) {
      console.log(e);
      console.log(`Error while seeding ${path.basename(__filename)}`);
      return;
    }
  }
}
