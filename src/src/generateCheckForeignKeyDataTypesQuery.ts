import { echo } from 'shelljs';
import { join } from 'path';

import { loadConfig } from '../loadConfig';

/**
 * !!! Get ROOT path to this package !!!
 */
const selfRootPath = join(__dirname, '../..');

const config = loadConfig();
const query = getCheckForeignKeyDataTypesStatement(process.env.DB_TEST ? 'direct-local-for-testing' : config.mysql.database);
const queryOnSingleLine = query.replace(/(\r\n|\n|\r)/gm, ''); // To allow using it on the command line as parameter

echo('-n', queryOnSingleLine).to( join(selfRootPath, 'lib', 'checkForeignKeyDataTypes.sql'));

function getCheckForeignKeyDataTypesStatement(schema: string): string {
  return `
  SELECT
	  KEY_CU.TABLE_SCHEMA,
    KEY_CU.TABLE_NAME,
    KEY_CU.CONSTRAINT_NAME,
    KEY_CU.COLUMN_NAME,
    T_COLS.DATA_TYPE,
    T_COLS.CHARACTER_MAXIMUM_LENGTH,
    KEY_CU.REFERENCED_TABLE_NAME,
    KEY_CU.REFERENCED_COLUMN_NAME,
    REF_T_COLS.DATA_TYPE AS REFERENCED_DATA_TYPE,
    REF_T_COLS.CHARACTER_MAXIMUM_LENGTH AS REFERENCED_CHARACTER_MAXIMUM_LENGTH
  FROM
	  INFORMATION_SCHEMA.KEY_COLUMN_USAGE KEY_CU
  join INFORMATION_SCHEMA.COLUMNS as T_COLS on
      T_COLS.TABLE_SCHEMA = KEY_CU.TABLE_SCHEMA
	  AND
    	T_COLS.TABLE_NAME = KEY_CU.TABLE_NAME
	  AND
    	T_COLS.COLUMN_NAME = KEY_CU.COLUMN_NAME
  join INFORMATION_SCHEMA.COLUMNS as REF_T_COLS on
    	REF_T_COLS.TABLE_SCHEMA = KEY_CU.TABLE_SCHEMA
	  AND
    	REF_T_COLS.TABLE_NAME = KEY_CU.REFERENCED_TABLE_NAME
    AND
    	REF_T_COLS.COLUMN_NAME = KEY_CU.REFERENCED_COLUMN_NAME
  WHERE
    KEY_CU.REFERENCED_TABLE_SCHEMA = '${ schema }'
	AND (T_COLS.DATA_TYPE <> REF_T_COLS.DATA_TYPE
		OR T_COLS.CHARACTER_MAXIMUM_LENGTH <> REF_T_COLS.CHARACTER_MAXIMUM_LENGTH);
  `;
}
