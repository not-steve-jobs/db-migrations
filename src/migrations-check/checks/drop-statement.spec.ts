import { Utils } from '../utils';

import { DropStatementCheckAction } from './drop-statement';

jest.mock('../migration-content-parser', () => ({
  MigrationUpContentParser: jest.fn().mockImplementation(() => ({
    parse: jest.fn().mockReturnValue('mocked migration content'),
  })),
}));

const grepMocked = jest.spyOn(Utils, 'grep');
describe('migrations-check', () => {
  describe('DropStatementCheckAction', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return ok when migration file contains safe statements', async () => {
      const checkAction = new DropStatementCheckAction();
      grepMocked.mockImplementationOnce(() => '');
      const result = await checkAction.run('mocked-migration-file.sql');
      expect(result).toEqual({
        status: 'ok',
        filename: 'mocked-migration-file.sql',
        checkType: 'drop-statement',
      });
    });

    it('should return errors when migration file contains dangerous statements', async () => {
      const checkAction = new DropStatementCheckAction();
      grepMocked.mockImplementationOnce(() => `
    (standard input):1:   DROP TABLE \`table1\` MODIFY COLUMN \`adminApiId\` int NULL;
    (standard input):5: TRUNCATE TABLE table2;
    (standard input):8: ALTER TABLE table3 DROP COLUMN \`someColumn\`;
    `);
      const result = await checkAction.run('mocked-migration-file.sql');
      expect(result).toEqual({
        status: 'error',
        filename: 'mocked-migration-file.sql',
        checkType: 'drop-statement',
        reasons: [
          {
            lineNumber: 1,
            reason: 'DROP TABLE `table1` MODIFY COLUMN `adminApiId` int NULL;',
          },
          {
            lineNumber: 5,
            reason: 'TRUNCATE TABLE table2;',
          },
          {
            lineNumber: 8,
            reason: 'ALTER TABLE table3 DROP COLUMN `someColumn`;',
          },
        ],
      });
    });
  });
});
