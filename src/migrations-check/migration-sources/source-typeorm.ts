import path from 'path';
import { spawnSync } from 'child_process';
import { readdirSync } from 'fs';

import { SourceExtractor, Utils } from '../utils';

const PENDING_MIGRATION_SUBSTR = '[ ]';

const camelToKebabCase = (str: string): string =>
  str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);


export class SourceTypeormExtractor implements SourceExtractor {

  public silent = false;

  public runMigrationShowCommand(): string | Error {
    const cmdBuild = { main: 'node', args: [
      path.join(Utils.getAppRoot(), Utils.isNpmLibrary() ? 'lib' : 'src', 'custom-cli.js'),
      'migration:show',
    ] };

    const cmdText = `${cmdBuild.main} ${cmdBuild.args.join(' ')}`;

    const { stderr, stdout, error } = spawnSync(cmdBuild.main, cmdBuild.args, {
      encoding: 'utf8',

    });

    if (error) {
      return error;
    }

    if (stderr) {
      return Utils.handleCmdError(cmdText, stderr);
    }

    return stdout;
  }

  public getAllMigrationFiles(): string[] {
    return readdirSync(Utils.getMigrationsDir(), { withFileTypes: true })
      .flatMap(dirent => (dirent.isFile() ? [dirent.name] : []))
      .filter(fileName => fileName.endsWith('.ts'));
  }

  public run(): Promise<string[]> {

    const migrationShowCmdOutput = this.runMigrationShowCommand();

    // rethrow error
    if (migrationShowCmdOutput instanceof  Error) {
      return Promise.reject(migrationShowCmdOutput);
    }

    const migrationFilesKebabCase = this.getAllMigrationFiles()
      .map(migrationFile => ({ originalFile: migrationFile, kebabified: camelToKebabCase(migrationFile) }));

    const parsedFiles: string[] = migrationShowCmdOutput
      .split('\n')
      .slice(1)
      .filter(line => line.includes(PENDING_MIGRATION_SUBSTR))
      .flatMap(line => {
        const parsed = line.split(' ');
        const migrationClassName = parsed[2];
        const timestamp = migrationClassName.match(/\d{13}/);
        const migrationName = migrationClassName.replace(`${timestamp}`, '');
        const migrationNameKebabCase = camelToKebabCase(migrationName).slice(1);
        const targetFile = migrationFilesKebabCase.find(fileEntry => fileEntry.kebabified.includes(migrationNameKebabCase));
        if (!targetFile) {
          return [];
        }
        const migrationFileToCheck = path.join(Utils.getMigrationsDir(), targetFile.originalFile);
        return [ migrationFileToCheck ];
      });

    return Promise.resolve(parsedFiles);
  };
}
