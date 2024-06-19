import path from 'path';

import { loadConfig as loadByConfigLibrary } from '@internal/config-library';

import { EnvProperties } from './src/env-properties';

const isJsBuild = __filename.endsWith('.js');
const pathToConfig = isJsBuild ? [process.cwd(), 'config'] : [__dirname, '../config'];

let envProperties: EnvProperties;

export function loadConfig(): EnvProperties {
  if (!envProperties) {
    const configDir = path.join(...pathToConfig);
    envProperties = loadByConfigLibrary(configDir);
  }

  return envProperties;
}
