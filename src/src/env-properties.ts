export type EnvProperties = {
  env: string;
  plant: string;
  name: string;
  keepAliveTimeout: number;
  mysql: EnvPropertiesMysql;
  mysqlCounter?: Pick<EnvPropertiesMysql, 'database'>;
};

export type EnvPropertiesMysql = {
  host: string;
  database: string;
  user: string;
  password: string;
  timezone: string;
  connectionLimit: number;
  multipleStatements: boolean;
};
