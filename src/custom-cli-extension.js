#!/usr/bin/env node
'use strict';
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @see typeorm-ts-node-commonjs
 * @link https://typeorm.io/using-cli#if-entities-files-are-in-typescript
 */
Object.defineProperty(exports, '__esModule', { value: true });
// TODO: include `tsconfig-paths` when start using aliases declared in `tsconfig.json:compilerOptions.paths`
// require('tsconfig-paths').register();

const path = require('path');
const fs = require('fs');
const configJsFilepath = path.join(__dirname, 'config.js');
const isJsBuild = !!fs.statSync(configJsFilepath, { throwIfNoEntry: false });

if (!isJsBuild) {
  require('ts-node').register();
}

process.argv.push('-d', isJsBuild ? __dirname + '/config.js' : __dirname + '/config.ts');

if (process.argv.includes('db:create')) {
  const index = process.argv.indexOf('db:create');
  // To skip the migrations
  process.argv.splice(index + 1, 0, '--synchronize=no');
}
require('typeorm-extension/bin/cli.cjs');
