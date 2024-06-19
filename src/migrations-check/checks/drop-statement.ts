import { CheckResult, MinimumLogger, RegisteredCheckOptionValue, Utils } from '../utils';
import { CheckAction } from '../utils';
import { MigrationUpContentParser } from '../migration-content-parser';

export class DropStatementCheckAction implements CheckAction {
  private PATTERNS = {
    DROP: 'DROP\\s+(COLUMN|TABLE)\\s*',
    TRUNCATE: 'TRUNCATE\\s*TABLE?\\s*',
    DELETE: 'DELETE\\s+\\S*',
  };

  public logger: MinimumLogger = Utils.createLogger(false);

  private ALL_PATTERNS = Object.values(this.PATTERNS);

  public async run (migrationFile: string): Promise<CheckResult> {
    const migrationParser = new MigrationUpContentParser(migrationFile, {
      logger: this.logger,
      tsConfigPath: Utils.getTsConfig(),
    });

    const contentOfMigrationUpFile = migrationParser.parse();

    const result = Utils.grep(this.ALL_PATTERNS, contentOfMigrationUpFile);

    const reasons = Utils.stdoutToLines(result.replaceAll('(standard input)', ''))
      .map(line => {
        const { number, reason } = line.match(':(?<number>\\d+):(?<reason>.*)')?.groups || {};
        return {
          lineNumber: +number,
          reason: reason.trim(),
        };
      });

    if (!result.trim()) {
      return {
        status: 'ok',
        filename: migrationFile,
        checkType: RegisteredCheckOptionValue.DropStatement,
      };
    }

    return {
      status: 'error',
      filename: migrationFile,
      reasons,
      checkType: RegisteredCheckOptionValue.DropStatement,
    };
  }
}
