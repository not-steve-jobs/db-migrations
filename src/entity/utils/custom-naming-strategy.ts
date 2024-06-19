/* eslint-disable @typescript-eslint/no-unused-vars */
import { __spread } from 'tslib';
import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm';

/**
 * Source code borrowed and changed from DefaultNamingStrategy.foreignKeyName
 */
export class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  private static splitCamelCase(value: string): string[] {
    return value.replace(/([0-9a-z])([A-Z])/g, '$1 $2').split(' ');
  }

  public primaryKeyName(tableOrName: Table | string, columnNames: string[]): string {
    const { clonedColumnNames, replacedTableName } = this.prepareTableInfo(tableOrName, columnNames);
    const key = replacedTableName + '-' + clonedColumnNames.join('_');
    return ('PK-' + key.toUpperCase()).slice(0, 63);
  }

  public foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    referencedTablePath?: string,
    referencedColumnNames?: string[]
  ): string {
    const { clonedColumnNames, replacedTableName } = this.prepareTableInfo(tableOrName, columnNames);
    const key = replacedTableName + '-' + clonedColumnNames.join('_');
    return ('FK-' + key.toUpperCase()).slice(0, 63);
  }

  public uniqueConstraintName(tableOrName: Table | string, columnNames: string[]): string {
    const { clonedColumnNames, replacedTableName } = this.prepareTableInfo(tableOrName, columnNames);
    const key = replacedTableName + '-' + clonedColumnNames.join('_');
    return ('UQ-' + key.toUpperCase()).slice(0, 63);
  }

  public indexName(tableOrName: Table | string, columnNames: string[], where?: string): string {
    const { clonedColumnNames, replacedTableName } = this.prepareTableInfo(tableOrName, columnNames);
    const key = replacedTableName + '-' + clonedColumnNames.join('_') + (where ? '-' + where : '');
    return ('IDX-' + key.toUpperCase()).slice(0, 63);
  }

  private prepareTableInfo(
    tableOrName: Table | string,
    columnNames: string[]
  ): {clonedColumnNames: string[]; replacedTableName: string} {
    // sort incoming column names to avoid issue when ["id", "name"] and ["name", "id"] arrays
    const clonedColumnNames = __spread(columnNames)
      .sort()
      .map(columnName => CustomNamingStrategy.splitCamelCase(columnName).join('_'));
    const tableName = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const replacedTableName = tableName.replace('.', '_');
    return { clonedColumnNames, replacedTableName };
  }
}
