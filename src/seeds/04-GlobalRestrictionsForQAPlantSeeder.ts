import fs from 'fs';
import path from 'path';
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { isQaPlantOrMockEnvironment } from '../src/environmentUtils';

export default class GlobalRestrictionsForQAPlantSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    if (!isQaPlantOrMockEnvironment()) {
      console.log(`Skipping seeds from ${path.basename(__filename)}`);
      return;
    }

    console.log(`Adding seeds from ${path.basename(__filename)}`);

    const globalRestrictionsForQAPlant = path.join(__dirname,
      '../../assets/seeds/4-GlobalRestrictionsForQAPlantSeeder/globalRestrictionsForQAPlant.sql');
    const queryRunner = dataSource.createQueryRunner();

    const queries = fs.readFileSync(globalRestrictionsForQAPlant).toString();
    try {
      await queryRunner.query(queries);
    } catch (e) {
      console.log('Ignoring global restrictions seeds');
      return;
    }
  }
}
