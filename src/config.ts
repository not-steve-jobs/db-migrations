import * as process from 'process';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SeederOptions } from 'typeorm-extension';

import { getConnectionOptions, getTestConnectionOptions, getTestConnectionOptionsCounterGenerator } from './src/connectionOptions';
import { getConnectionSource } from './src/connectionSource';
import { loadConfig } from './loadConfig';

let connectionOptions: MysqlConnectionOptions & SeederOptions;
if (process.env.COUNTER_GENERATOR) {
  connectionOptions = getTestConnectionOptionsCounterGenerator(loadConfig());
} else {
  connectionOptions = process.env.DB_TEST ? getTestConnectionOptions(loadConfig()) : getConnectionOptions(loadConfig());
}
const connectionSource = getConnectionSource(connectionOptions);

export default connectionSource;
