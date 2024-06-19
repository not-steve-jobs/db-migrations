import path from 'path';

import { CheckAction, CheckResult, MinimumLogger, RegisteredCheckOptionValue, Utils } from '../utils';
import { MigrationUpContentParser } from '../migration-content-parser';

const TIMESTAMP_LENGTH = 13;

export class MigrationNameCheckAction implements CheckAction {
  public logger: MinimumLogger = Utils.createLogger(false);

  public async run (migrationFile: string): Promise<CheckResult> {
    const tsConfigDir = Utils.getTsConfig();
    const migrationParser = new MigrationUpContentParser(migrationFile, {
      logger: this.logger,
      tsConfigPath: tsConfigDir,
    });

    const className = migrationParser.getClassName();
    this.logger.info(`Got the class name : ${className}`);

    const filenameTimestamp = path.basename(migrationFile).substring(0, TIMESTAMP_LENGTH);
    const classnameTimestamp = className.substring(className.length - TIMESTAMP_LENGTH);

    if (!this.isValidTimestamp(filenameTimestamp) || !this.isValidTimestamp(classnameTimestamp)) {
      return {
        status: 'error',
        filename: migrationFile,
        checkType: RegisteredCheckOptionValue.MigrationName,
        reasons: [
          {
            lineNumber: 0,
            reason: `Filename and classname timestamp must have length of ${ TIMESTAMP_LENGTH } characters` +
              ` and contain only numbers (${ filenameTimestamp }, ${ classnameTimestamp })`,
          },
        ],
      };
    }

    if (filenameTimestamp !== classnameTimestamp) {
      return {
        status: 'error',
        filename: migrationFile,
        checkType: RegisteredCheckOptionValue.MigrationName,
        reasons: [
          {
            lineNumber: 0,
            reason: `Filename and classname timestamp don't match (${ filenameTimestamp } !== ${ classnameTimestamp })`,
          },
        ],
      };
    }

    return {
      status: 'ok',
      filename: migrationFile,
      checkType: RegisteredCheckOptionValue.MigrationName,
    };
  }

  private isValidTimestamp(str: string): boolean {
    return str.length === TIMESTAMP_LENGTH && this.containsOnlyDigits(str);
  }
  private containsOnlyDigits(str: string): boolean {
    return /^\d+$/.test(str);
  }
}
