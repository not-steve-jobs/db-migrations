#!/usr/bin/env node
import { spawnSync } from 'child_process';
import { join } from 'path';

const customCliExtension = join(__dirname, '../custom-cli-extension.js');
const customCli = join(__dirname, '../custom-cli.js');

const commands : { args: string[]; successMessage: string; errorMessage: string }[] = [
  { args: [ customCliExtension, 'db:drop' ], successMessage: 'Database dropped', errorMessage: 'Database drop failed' },
  { args: [ customCliExtension, 'db:create' ], successMessage: 'Database created', errorMessage: 'Database create failed' },
  { args: [ customCli, 'migration:run' ], successMessage: 'Migrations finished', errorMessage: 'Migrations failed' },
  { args: [ customCliExtension, 'seed:run' ], successMessage: 'Seeds finished', errorMessage: 'Seeds failed' },
];

for (const command of commands) {
  exec(command.args, command.successMessage, command.errorMessage);
}

function exec(args: string[], successMessage: string, errorMessage: string): void {
  const child = spawnSync('node', args, { encoding: 'utf8', stdio: 'inherit' });

  if (child.status) {
    console.error(`\n${ errorMessage }`);
    process.exit(child.status);
  } else {
    console.log(`\n${ successMessage }`);
  }
}
