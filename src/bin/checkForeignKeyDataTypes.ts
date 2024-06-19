#!/usr/bin/env node
import { join } from 'path';
import { echo, exec, exit } from 'shelljs';

/**
 * !!! Get ROOT path to this package !!!
 */
const selfRootPath = join(__dirname, '../..');

const generateQueryPath = join(selfRootPath, 'lib', 'src', 'generateCheckForeignKeyDataTypesQuery.js');
const customCliPath = join(selfRootPath, 'lib', 'custom-cli.js');
const queryPath = join(selfRootPath, 'lib', 'checkForeignKeyDataTypes.sql');

exec(`node ${ generateQueryPath }`, { silent: true });
const results = exec(`${ process.env.DB_TEST ? 'DB_TEST=1' : '' } node ${ customCliPath } query "$(cat ${ queryPath })"`
  , { silent: true }).stdout;

const allOK = results.indexOf('Query has been executed. Result: \n[]') > -1;

if (!allOK) {
  echo(results.slice(results.indexOf('Query has been executed. Result: \n[')));
  echo('');
  echo('There are foreign key data types inconsistencies. Please fix them.');
  exit(1);
}

echo('The foreign keys have consistent types!');
exit(0);
