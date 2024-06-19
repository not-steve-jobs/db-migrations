import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { DataSource } from 'typeorm';

export function getConnectionSource(mysqlConnectionOptions: MysqlConnectionOptions): DataSource {
  // suppress any logs in silent mode for migrations-check
  if (process.env.SILENT_MODE !== '1') {
    console.log(`[OrmConfig] host: ${mysqlConnectionOptions.host}; database: ${mysqlConnectionOptions.database}`);
  }
  return new DataSource(mysqlConnectionOptions);
}
