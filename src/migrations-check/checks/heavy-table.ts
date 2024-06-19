import path from 'path';
import * as fs from 'fs';

import connection from '../../config';
import { loadConfig } from '../../loadConfig';
import { CheckAction, CheckResult, MinimumLogger, RegisteredCheckOptionValue, Utils } from '../utils';
import { MigrationUpContentParser } from '../migration-content-parser';

type TableSizesSqlOutputItem = {
  tableSchema: string;
  tableName: string;
  dataLength: string;
  indexLength: string;
  total: string;
};

type TableSizesSqlOutput = Array<TableSizesSqlOutputItem>;

const sizeUnits = ['b', 'kb', 'mb', 'gb', 'zb', 'pb'];

export function convertBytesToHuman(bytes: number, precision: number = 2): string {
  if (!bytes) {
    return '0 b';
  }

  const oneKiloByte = 1024;
  const decimalPlaces = precision < 0 ? 0 : precision;
  const sizeIndex = Math.floor(Math.log(bytes) / Math.log(oneKiloByte));
  const convertedValue = parseFloat((bytes / Math.pow(oneKiloByte, sizeIndex)).toFixed(decimalPlaces));

  return `${convertedValue} ${sizeUnits[sizeIndex]}`;
}

export class HeavyTablesCheckAction implements CheckAction {
  private PATTERNS = {
    ALTER: 'ALTER\\s+(TABLE|COLUMN)\\s*',
  };

  public logger: MinimumLogger = Utils.createLogger(false);
  public options: { runQuery: boolean } = { runQuery: false };

  private ALL_PATTERNS = Object.values(this.PATTERNS);
  public HEAVY_TABLE_SIZE = 1_073_741_824; // 1G

  public loadTablesWithSizesFromFile(): TableSizesSqlOutput {
    const pathToFile = path.join(__dirname, '../../../assets/table-sizes-sql-output.json');
    const tablesWithSizes = fs.readFileSync(pathToFile, { encoding: 'utf-8' });
    return JSON.parse(tablesWithSizes) as TableSizesSqlOutput;
  }
  public async loadTablesWithSizesFromQuery(): Promise<TableSizesSqlOutput | Error> {
    try {
      const config = loadConfig();
      await connection.initialize();
      const query = `
      SELECT
        TABLE_SCHEMA as tableSchema,
        TABLE_NAME as tableName,
        data_length as dataLength,
        index_length as indexLength,
        (data_length + index_length) as \`total\`
      FROM information_schema.TABLES t
      where TABLE_SCHEMA = ?
      order by \`total\` desc
    `;
      const data: Array<{
        tableSchema: string;
        tableName: string;
        dataLength: string;
        indexLength: string;
        total: string;
      }> = await connection.query(query, [config.mysql.database]);
      return data;
    } catch (err) {
      return err as Error;
    } finally {
      await connection.destroy();
    }
  }

  public getHeavyTablesFrom(tableSizesSqlOutput: TableSizesSqlOutput): Array<{tableName: string; size: string}> {
    return tableSizesSqlOutput
      .filter(row => +row.total >= this.HEAVY_TABLE_SIZE)
      .sort((a,b) => +b.total - +a.total)
      .map(heavyTableItem => ({
        tableName: heavyTableItem.tableName,
        size: convertBytesToHuman(+heavyTableItem.total),
      }));
  }

  public async run (migrationFile: string): Promise<CheckResult> {
    const tsConfigDir = Utils.getTsConfig();
    const migrationParser = new MigrationUpContentParser(migrationFile, {
      logger: this.logger,
      tsConfigPath: tsConfigDir,
    });
    const contentOfMigrationUpFile = migrationParser.parse();
    const tableSizesSqlOutput: TableSizesSqlOutput = this.loadTablesWithSizesFromFile();
    let heavyTables: Array<{tableName: string; size: string}> = this.getHeavyTablesFrom(tableSizesSqlOutput);
    if (this.options.runQuery) {
      const result = await this.loadTablesWithSizesFromQuery();
      if (result instanceof Error) {
        return Promise.reject(result);
      }
      heavyTables =  this.getHeavyTablesFrom(result);
    }
    const result = Utils.grep(this.ALL_PATTERNS, contentOfMigrationUpFile);

    const reasons = Utils.stdoutToLines(result.replaceAll('(standard input)', ''))
      .flatMap(line => {
        const { number, reason } = line.match(':(?<number>\\d+):(?<reason>.*)')?.groups || {};

        const tableNameRaw = (reason.match(/ALTER TABLE \\?`(?<tbl>[^`]+)\\?`/i)?.groups || {}).tbl?.trim();
        const tableNameWithoutBackticks = (reason.match(/ALTER\s+TABLE\s+(?<tbl>\S+)/i)?.groups || {}).tbl?.trim();

        const tableName = tableNameRaw?.replaceAll('\\', '') || tableNameWithoutBackticks;
        const targetTableName = heavyTables.find(heavyTbl => (heavyTbl.tableName === tableName));

        if (!targetTableName) {
          return [];
        }

        return [
          {
            lineNumber: +number,
            reason: `potentially dangerous operation on table ${targetTableName.tableName}. size: ${targetTableName.size}`,
          },
        ];
      });

    if (!reasons.length) {
      return {
        status: 'ok',
        filename: migrationFile,
        checkType: RegisteredCheckOptionValue.HeavyTables,
      };
    }

    return { filename: migrationFile, status: 'error', reasons, checkType: RegisteredCheckOptionValue.HeavyTables };
  }
}
