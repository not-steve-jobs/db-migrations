import { createApp } from './index';
import { SourceGitExtractor } from './migration-sources/source-git';
import { SourceTypeormExtractor } from './migration-sources/source-typeorm';
import { Utils } from './utils';

jest.spyOn(Utils, 'errorHandler').mockImplementation(error => {
  throw error;
});

jest.spyOn(SourceGitExtractor.prototype, 'isBranchOrCommitExists').mockReturnValue(true);

// jest.spyOn(SourceTypeormExtractor.prototype, 'getAllMigrationFiles').mockReturnValue([]);

describe('migrations-check', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // jest.resetAllMocks();
  });
  describe('root command', () => {

    it('should throw an error if --source is missing', async () => {
      const app = createApp().exitOverride();
      const result = app.parseAsync(['node', 'migrations-check']);
      await expect(result).rejects.toThrowError("error: required option '--source <value>' not specified");
    });

    it('should throw an error if --checks is not specified', async () => {
      const app = createApp().exitOverride();
      const result = app.parseAsync(['node', 'migrations-check', '--source', 'git']);
      await expect(result).rejects.toThrowError("error: required option '--checks <comma_separated_values...>' not specified");
    });

    it('should throw an error when --source=git and --branchOrCommit is missing', async () => {
      const app = createApp().exitOverride();
      const result = app.parseAsync(['node', 'migrations-check', '--source', 'git', '--checks', 'drop-statement']);
      await expect(result).rejects.toBe('--branchOrCommit <value> is required when --source=git');
    });

    it('[source=git checks=drop-statement] should be completed successfully', async () => {
      const stdout: string[] = [];

      const diffOutput = [
        'D       src/migration/1685528070672-init-referral-program.ts',
        'M       src/migration/1687151137878-add-questionnaire-corporateBank.ts',
      ].join('\n');
      jest.spyOn(SourceGitExtractor.prototype, 'runDiffCommand').mockReturnValueOnce(diffOutput);

      const app = createApp()
        .exitOverride()
        .configureOutput({
          writeOut: str => stdout.push(str),
          writeErr: str => stdout.push(str),
        });
      jest.spyOn(global.console, 'log').mockImplementation((msg, params) => {
        stdout.push(msg);
        if (params) {
          stdout.push(params);
        }
      });
      jest.spyOn(global.console, 'error').mockImplementation((msg, params) => {
        stdout.push(msg);
        if (params) {
          stdout.push(params);
        }
      });
      await app.parseAsync([
        'node',
        'migrations-check',
        '--source',
        'git',
        '--checks',
        'drop-statement',
        '--branchOrCommit',
        'master',
        '--mainBranchOrCommit',
        'master',
        '--silent',
      ]);
      expect(JSON.parse(stdout[0])).toEqual([
        {
          filename: 'src/migration/1687151137878-add-questionnaire-corporateBank.ts',
          status: 'ok',
          checkType: 'drop-statement',
        },
      ]);
    });

    it('[source=git checks=drop-statement] exitCode=1  should return migration with error', async () => {
      const stdout: string[] = [];

      jest.spyOn(SourceGitExtractor.prototype, 'runDiffCommand').mockReturnValueOnce(
        `A       src/migration/1691136549374-alter-cp-currencies-columns.ts`
      );

      const app = createApp()
        .exitOverride()
        .configureOutput({
          writeOut: str => stdout.push(str),
          writeErr: str => stdout.push(str),
        });
      jest.spyOn(global.console, 'log').mockImplementation((msg, params) => {
        stdout.push(msg);
        if (params) {
          stdout.push(params);
        }
      });
      jest.spyOn(global.console, 'error').mockImplementation((msg, params) => {
        stdout.push(msg);
        if (params) {
          stdout.push(params);
        }
      });
      await app.parseAsync([
        'node',
        'migrations-check',
        '--source',
        'git',
        '--checks',
        'drop-statement',
        '--branchOrCommit',
        'master',
        '--mainBranchOrCommit',
        'master',
        '--silent',
      ]);
      expect(JSON.parse(stdout[0])).toEqual([
        {
          filename: 'src/migration/1691136549374-alter-cp-currencies-columns.ts',
          reasons: [
            {
              lineNumber: 2,
              reason: 'await queryRunner.query(`ALTER TABLE \\`cp_currencies\\` DROP COLUMN \\`iso2\\``);',
            },
            {
              lineNumber: 3,
              reason: 'await queryRunner.query(`ALTER TABLE \\`cp_currencies\\` DROP COLUMN \\`name\\``);',
            },
          ],
          status: 'error',
          checkType: 'drop-statement',
        },
      ]);
    });

    it('[source=git checks=heavy-tables] should be completed successfully', async () => {
      const stdout: string[] = [];

      const app = createApp()
        .exitOverride()
        .configureOutput({
          writeOut: str => stdout.push(str),
          writeErr: str => stdout.push(str),
          outputError: (str, write) => write(str),
        });
      jest.spyOn(global.console, 'log').mockImplementation((msg, params) => {
        stdout.push(msg);
        if (params) {
          stdout.push(params);
        }
      });

      jest.spyOn(SourceGitExtractor.prototype, 'runDiffCommand').mockReturnValueOnce([
        'M       src/migration/1687151137878-add-questionnaire-corporateBank.ts',
      ].join('\n'));
      await app.parseAsync([
        'node',
        'migrations-check',
        '--source',
        'git',
        '--checks',
        'heavy-tables',
        '--branchOrCommit',
        'master',
        '--mainBranchOrCommit',
        'master',
        '--silent',
      ]);
      expect(JSON.parse(stdout[0])).toEqual([
        {
          filename: 'src/migration/1687151137878-add-questionnaire-corporateBank.ts',
          status: 'ok',
          checkType: 'heavy-tables',
        },
      ]);
    });

    it('[source=git checks=heavy-tables] exitCode=1 should return migration with error', async () => {
      const stdout: string[] = [];

      const app = createApp()
        .exitOverride()
        .configureOutput({
          writeOut: str => stdout.push(str),
          writeErr: str => stdout.push(str),
          outputError: (str, write) => write(str),
        });
      jest.spyOn(global.console, 'log').mockImplementation((msg, params) => {
        stdout.push(msg);
        if (params) {
          stdout.push(params);
        }
      });
      jest.spyOn(global.console, 'error').mockImplementation((msg, params) => {
        stdout.push(msg);
        if (params) {
          stdout.push(params);
        }
      });
      jest.spyOn(SourceGitExtractor.prototype, 'runDiffCommand').mockReturnValueOnce([
        'A      src/migration/1696925812349-adjust-tables-after-maria-db-upgrade.ts',
        'M       src/migration/1687151137878-add-questionnaire-corporateBank.ts',
      ].join('\n'));
      await app.parseAsync([
        'node',
        'migrations-check',
        '--source',
        'git',
        '--checks',
        'heavy-tables',
        '--branchOrCommit',
        'master',
        '--mainBranchOrCommit',
        'master',
        '--silent',
      ]);
      expect(JSON.parse(stdout[0])).toEqual([
        {
          filename: 'src/migration/1687151137878-add-questionnaire-corporateBank.ts',
          status: 'ok',
          checkType: 'heavy-tables',
        },
        {
          filename: 'src/migration/1696925812349-adjust-tables-after-maria-db-upgrade.ts',
          status: 'error',
          reasons: [
            {
              lineNumber: 4,
              reason: 'potentially dangerous operation on table accounts. size: 2.84 gb',
            },
          ],
          checkType: 'heavy-tables',
        },
      ]);
    });

    it('[source=typeorm checks=drop-statement] should be completed successfully', async () => {
      const stdout: string[] = [];

      const typeormShowCmdOutput = [
        '[X] 50 SchedulerJobsTable1698746809706',
        '[ ] addQuestionnaireCorporateBank1687151137878',
      ].join('\n');

      jest.spyOn(SourceTypeormExtractor.prototype, 'runMigrationShowCommand').mockReturnValue(typeormShowCmdOutput);

      const app = createApp()
        .exitOverride()
        .configureOutput({
          writeOut: str => stdout.push(str),
          writeErr: str => stdout.push(str),
        });
      jest.spyOn(global.console, 'log').mockImplementation((msg, params) => {
        stdout.push(msg);
        if (params) {
          stdout.push(params);
        }
      });
      jest.spyOn(global.console, 'error').mockImplementation((msg, params) => {
        stdout.push(msg);
        if (params) {
          stdout.push(params);
        }
      });
      await app.parseAsync([
        'node',
        'migrations-check',
        '--source',
        'typeorm',
        '--checks',
        'drop-statement',
        '--silent',
      ]);
      const result = JSON.parse(stdout[0]);
      expect(result).toEqual([
        expect.objectContaining({
          filename: expect.stringContaining('src/migration/1687151137878-add-questionnaire-corporateBank.ts'),
          status: 'ok',
          checkType: 'drop-statement',
        }),
      ]);
    });

    it('[source=typeorm checks=drop-statement] exitCode=1 should return migration with error', async () => {
      const stdout: string[] = [];

      const typeormShowCmdOutput = [
        '[X] 50 SchedulerJobsTable1698746809706',
        '[ ] AlterCpCurrenciesColumns1691136549374',
      ].join('\n');

      jest.spyOn(SourceTypeormExtractor.prototype, 'runMigrationShowCommand').mockReturnValue(typeormShowCmdOutput);

      const app = createApp()
        .exitOverride()
        .configureOutput({
          writeOut: str => stdout.push(str),
          writeErr: str => stdout.push(str),
        });
      jest.spyOn(global.console, 'log').mockImplementation((msg, params) => {
        stdout.push(msg);
        if (params) {
          stdout.push(params);
        }
      });
      jest.spyOn(global.console, 'error').mockImplementation((msg, params) => {
        stdout.push(msg);
        if (params) {
          stdout.push(params);
        }
      });
      await app.parseAsync([
        'node',
        'migrations-check',
        '--source',
        'typeorm',
        '--checks',
        'drop-statement',
        '--silent',
      ]);
      const result = JSON.parse(stdout[0]);
      expect(result).toEqual([
        expect.objectContaining({
          filename: expect.stringContaining('src/migration/1691136549374-alter-cp-currencies-columns.ts'),
          reasons: [
            {
              lineNumber: 2,
              reason: 'await queryRunner.query(`ALTER TABLE \\`cp_currencies\\` DROP COLUMN \\`iso2\\``);',
            },
            {
              lineNumber: 3,
              reason: 'await queryRunner.query(`ALTER TABLE \\`cp_currencies\\` DROP COLUMN \\`name\\``);',
            },
          ],
          status: 'error',
          checkType: 'drop-statement',
        }),
      ]);
    });

  });
});
