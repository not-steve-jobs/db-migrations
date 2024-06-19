import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SeederOptions } from 'typeorm-extension';
import { join } from 'path';

import { CustomNamingStrategy } from '../entity/utils/custom-naming-strategy';

import { EnvProperties } from './env-properties';

/**
 * !!! Get ROOT path to this package !!!
 */
const selfRootPath = join(__dirname, '../..');
const isJsBuild = __filename.endsWith('.js');

export function getConnectionOptions(envProperties : EnvProperties): MysqlConnectionOptions & SeederOptions {
  return {
    type: 'mariadb',
    host: envProperties.mysql.host,
    database: envProperties.mysql.database,
    username: envProperties.mysql.user,
    password: envProperties.mysql.password,
    timezone: envProperties.mysql.timezone,
    poolSize: envProperties.mysql.connectionLimit,
    synchronize: false, // !!! NEVER set it true !!! You may lose data in your DB
    logging: ['error', 'warn'],
    logger: process.env.NO_COLOR ? 'simple-console' : 'advanced-console',
    maxQueryExecutionTime: 10000,
    namingStrategy: new CustomNamingStrategy(),
    migrationsTableName: 'migration_typeorm_20230323',
    migrations: [
      join(selfRootPath, isJsBuild ? 'lib/migration/*.js' : 'src/migration/*.ts'),
    ],
    entities: [
      join(selfRootPath, isJsBuild ? 'lib/entity/**/*.js' : 'src/entity/**/!(*.spec.ts)'),
    ],
    seeds: [
      join(selfRootPath, isJsBuild ? 'lib/seeds/*.js' : 'src/seeds/*.ts'),
    ],
    // subscribers: ["src/subscriber/**/*.ts"]
    // cli: {
    //     entitiesDir: 'src/entity',
    //     migrationsDir: 'src/migration',
    //     subscribersDir: 'src/subscriber',
    // },
    multipleStatements: true,
    charset: 'utf8_general_ci',
  };
}

export function getTestConnectionOptions(envProperties : EnvProperties): MysqlConnectionOptions {
  return {
    ...getConnectionOptions(envProperties),
    database: 'direct-local-for-testing',
  };
}

export function getTestConnectionOptionsCounterGenerator(envProperties : EnvProperties): MysqlConnectionOptions & SeederOptions {
  return {
    ...getConnectionOptions(envProperties),
    /**
     * Attempt to load specific database name for counter-generator - applicable mostly for current repository
     * Alternatively use common DB name - applicable mostly for other repositories where `db-migrations` is used as a library
     */
    database: envProperties.mysqlCounter?.database ?? envProperties.mysql.database,
    migrations: undefined,
    entities: undefined,
    seeds: undefined,
  };
}
