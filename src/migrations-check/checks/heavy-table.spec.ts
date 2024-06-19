import { Utils } from '../utils';

import { HeavyTablesCheckAction } from './heavy-table';

jest.mock('../migration-content-parser', () => ({
  MigrationUpContentParser: jest.fn().mockImplementation(() => ({
    parse: jest.fn().mockReturnValue('mocked migration content'),
  })),
}));

const grepMocked = jest.spyOn(Utils, 'grep');
describe('migrations-check', () => {
  describe('HeavyTablesCheckAction', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return ok when migration file contains safe statements', async () => {
      const checkAction = new HeavyTablesCheckAction();
      grepMocked.mockImplementationOnce(() => '');
      const result = await checkAction.run('mocked-migration-file.sql');
      expect(result).toEqual({
        status: 'ok',
        filename: 'mocked-migration-file.sql',
        checkType: 'heavy-tables',
      });
    });

    it('should return errors when migration file contains statements affecting heavy tables', async () => {
      jest.spyOn(HeavyTablesCheckAction.prototype, 'loadTablesWithSizesFromFile').mockReturnValueOnce([
        { tableName: 'table1', dataLength: '80', indexLength: '20', tableSchema: 'direct', total: '100' },
        { tableName: 'table2', dataLength: '100', indexLength: '100', tableSchema: 'direct', total: '200' },
      ]);

      const checkAction = new HeavyTablesCheckAction();
      checkAction.HEAVY_TABLE_SIZE = 200;
      const mockGrepResult = `
      (standard input):1:   ALTER TABLE \`table1\` MODIFY COLUMN \`adminApiId\` int NULL;
      (standard input):5:ALTER TABLE table2 MODIFY COLUMN \`someColumn\` varchar(255);
    `;

      grepMocked.mockImplementationOnce(() => mockGrepResult);

      const result = await checkAction.run('mocked-migration-file.sql');

      expect(result).toEqual({
        filename: 'mocked-migration-file.sql',
        status: 'error',
        reasons: [
          {
            lineNumber: 5,
            reason: 'potentially dangerous operation on table table2. size: 200 b',
          },
        ],
        checkType: 'heavy-tables',
      });
    });

    it('should return ok when migration file contains statements affecting only light tables', async () => {
      jest.spyOn(HeavyTablesCheckAction.prototype, 'loadTablesWithSizesFromFile').mockReturnValueOnce([
        { tableName: 'table1', dataLength: '80', indexLength: '20', tableSchema: 'direct', total: '100' },
        { tableName: 'table2', dataLength: '100', indexLength: '100', tableSchema: 'direct', total: '200' },
      ]);

      const checkAction = new HeavyTablesCheckAction();
      checkAction.HEAVY_TABLE_SIZE = 250;
      const mockGrepResult = `
      (standard input):1:   ALTER TABLE \`table1\` MODIFY COLUMN \`adminApiId\` int NULL;
      (standard input):5:ALTER TABLE table2 MODIFY COLUMN \`someColumn\` varchar(255);
    `;
      grepMocked.mockImplementationOnce(() => mockGrepResult);

      const result = await checkAction.run('mocked-migration-file.sql');

      expect(result).toEqual({
        filename: 'mocked-migration-file.sql',
        status: 'ok',
        checkType: 'heavy-tables',
      });
    });

    it('should take tables sizes from query if --runQuery is provided and return ok', async () => {
      jest.spyOn(HeavyTablesCheckAction.prototype, 'loadTablesWithSizesFromFile').mockReturnValueOnce([
        { tableName: 'table1', dataLength: '80', indexLength: '20', tableSchema: 'direct', total: '100' },
        { tableName: 'table2', dataLength: '100', indexLength: '100', tableSchema: 'direct', total: '200' },
      ]);

      jest.spyOn(HeavyTablesCheckAction.prototype, 'loadTablesWithSizesFromQuery').mockResolvedValueOnce([
        { tableName: 'table1', dataLength: '80', indexLength: '20', tableSchema: 'direct', total: '100' },
        { tableName: 'table2', dataLength: '100', indexLength: '100', tableSchema: 'direct', total: '200' },
      ]);

      const checkAction = new HeavyTablesCheckAction();
      checkAction.options = { runQuery: true };
      checkAction.HEAVY_TABLE_SIZE = 250;
      const mockGrepResult = `
      (standard input):1:   ALTER TABLE \`table1\` MODIFY COLUMN \`adminApiId\` int NULL;
      (standard input):5:ALTER TABLE table2 MODIFY COLUMN \`someColumn\` varchar(255);
    `;
      grepMocked.mockImplementationOnce(() => mockGrepResult);

      const result = await checkAction.run('mocked-migration-file.sql');

      expect(result).toEqual({
        filename: 'mocked-migration-file.sql',
        status: 'ok',
        checkType: 'heavy-tables',
      });
    });

    it('should take tables sizes from query if --runQuery is provided and return error', async () => {
      jest.spyOn(HeavyTablesCheckAction.prototype, 'loadTablesWithSizesFromFile').mockReturnValueOnce([
        { tableName: 'table1', dataLength: '80', indexLength: '20', tableSchema: 'direct', total: '100' },
        { tableName: 'table2', dataLength: '100', indexLength: '100', tableSchema: 'direct', total: '200' },
      ]);

      jest.spyOn(HeavyTablesCheckAction.prototype, 'loadTablesWithSizesFromQuery').mockResolvedValueOnce([
        { tableName: 'table1', dataLength: '80', indexLength: '20', tableSchema: 'direct', total: '100' },
        { tableName: 'table2', dataLength: '100', indexLength: '100', tableSchema: 'direct', total: '5000' },
      ]);

      const checkAction = new HeavyTablesCheckAction();
      checkAction.options = { runQuery: true };
      checkAction.HEAVY_TABLE_SIZE = 250;
      const mockGrepResult = `
      (standard input):1:   ALTER TABLE \`table1\` MODIFY COLUMN \`adminApiId\` int NULL;
      (standard input):5:ALTER TABLE table2 MODIFY COLUMN \`someColumn\` varchar(255);
    `;
      grepMocked.mockImplementationOnce(() => mockGrepResult);

      const result = await checkAction.run('mocked-migration-file.sql');

      expect(result).toEqual({
        filename: 'mocked-migration-file.sql',
        status: 'error',
        checkType: 'heavy-tables',
        reasons: [
          {
            lineNumber: 5,
            reason: 'potentially dangerous operation on table table2. size: 4.88 kb',
          },
        ],
      });
    });
  });
});
