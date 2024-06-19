import path from 'path';
import { inspect } from 'util';
import { spawnSync } from 'child_process';

type SucceededFile = { status: 'ok'; filename: string; checkType: RegisteredCheckOptionValue};
type FailedFile = {
  status: 'error';
  filename: string;
  checkType: RegisteredCheckOptionValue;
  reasons: { lineNumber: number; reason: string}[];
};

export type CheckResult = SucceededFile | FailedFile;

export type CheckAction = {
  run(file: string): Promise<CheckResult>;
  logger: MinimumLogger;
  options?: { runQuery: boolean };
}

export enum RegisteredCheckOptionValue {
  HeavyTables = 'heavy-tables',
  DropStatement= 'drop-statement',
  MigrationName= 'migration-name'
}

export enum RegisteredSourceOptionValue {
  Git = 'git',
  Typeorm = 'typeorm'
}

export type MinimumLogger = {
  debug(message?: any, ...optionalParams: any[]): void;
  info(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
};

export interface SourceExtractor<T extends unknown[]=unknown[]> {
  run(...args: T): Array<string> | Promise<Array<string>>;
  silent: boolean;
}

export class Utils {
  public static errorHandler(error: unknown): void {
    process.exitCode = 1;
    if (error instanceof Error) {
      console.error('Error', inspect(error.message, { depth: null, showHidden: false, colors: true }));
    } else {
      console.error('Error', inspect(error, { depth: null, showHidden: false, colors: true }));
    }
  }

  public static createLogger(silent = false): MinimumLogger {
    return silent ? {
      info: () => undefined,
      debug: () => undefined,
      error: console.error,
    } : console;
  }


  public static printCheckResult(checkResults: CheckResult, method: 'error' | 'log' = 'log'): void {
    console[method](JSON.stringify(checkResults, null, 2));
  }

  public static handleCmdError(cmdName: string, stdErr: string): Error {
    console.info(`stderr of the command: ${cmdName}`);
    return new Error(stdErr);
  }

  public static stdoutToLines(stdout: string): string[] {
    return stdout
      .split('\n')
      .filter(line => line.trim());
  }

  public static MIGRATIONS_DIR = 'src/migration/';

  public static isNpmLibrary(): boolean {
    return __filename.endsWith('.js');
  }

  public static getMigrationsPathPattern(): RegExp {
    return new RegExp(`${this.MIGRATIONS_DIR}.*ts`);
  }

  public static getAppRoot(): string {
    const cmdRoot = path.dirname(require.main?.filename || '');
    return path.join(cmdRoot, '../../');
  }

  public static getMigrationsDir(): string {
    return path.join(Utils.getAppRoot(), Utils.MIGRATIONS_DIR);
  }

  public static getTsConfig(): string {
    return path.join(Utils.getAppRoot(), 'tsconfig.json');
  }

  public static grep(patterns: string[], fileContent: string): string {
    const withRemovedEmptyPatterns = patterns.filter(Boolean);
    if (!withRemovedEmptyPatterns.length) {
      return '';
    }
    const cmd = 'grep';
    const commonArgs = [
      '--line-number',
      '--ignore-case',
      '-s',
      '--color',
      '-E',
      '--with-filename',
      '--regexp',
    ];
    const child = spawnSync(cmd,
      [
        ...commonArgs,
        withRemovedEmptyPatterns.join('|'),
      ],
      { encoding : 'utf8', input: fileContent }
    );

    if (child.error) {
      console.error('Error:', child.error);
      process.exit(1);
    }

    return child.stdout;
  }
}
