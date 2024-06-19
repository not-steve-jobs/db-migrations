import { SourceGitExtractor } from './source-git';

jest.spyOn(SourceGitExtractor.prototype, 'isBranchOrCommitExists').mockReturnValue(true);

describe('migrations-check', () => {
  describe('SourceGitExtractor', () => {
    it('should send back list of valid filenames', async () => {
      const diffOutput = `
D       src/migration/1685528070672-init-referral-program.ts
M       src/migration/1687151137878-add-questionnaire-corporateBank.ts
A       src/migration/1690871300557-change-in-configurator-is-crypto-default-value.ts
`;
      jest.spyOn(SourceGitExtractor.prototype, 'runDiffCommand').mockReturnValue(diffOutput);
      const sourceExtractor = new SourceGitExtractor();
      const migrationFiles = await sourceExtractor.run('test_branch', 'master');
      expect(migrationFiles).toEqual([
        'src/migration/1687151137878-add-questionnaire-corporateBank.ts',
        'src/migration/1690871300557-change-in-configurator-is-crypto-default-value.ts',
      ]);
    });

    it('should skip non-migration files and deleted migrations', async() => {
      const diffOutput = `
A       mysql/dropTestSchemas.ts
A       mysql/schemaUtils.ts
A       mysql/sqlUtils.ts
M       package-lock.json
M       package.json
D       src/migration/1685528070672-init-referral-program.ts
`;
      jest.spyOn(SourceGitExtractor.prototype, 'runDiffCommand').mockReturnValue(diffOutput);
      const sourceExtractor = new SourceGitExtractor();
      const migrationFiles = await sourceExtractor.run('test_branch', 'master');
      expect(migrationFiles).toEqual([]);
    });

    it('should include correct path to migrations dir', async() => {
      const diffOutput = `
A       src/migration/1687151137878-add-questionnaire-corporateBank.ts
A       wrong_dir/migration/1690871300557-change-in-configurator-is-crypto-default-value.ts
A       typeorm/wrong_dir/1685528070672-init-referral-program.ts
`;
      jest.spyOn(SourceGitExtractor.prototype, 'runDiffCommand').mockReturnValue(diffOutput);
      const sourceExtractor = new SourceGitExtractor();
      const migrationFiles: string[] = await sourceExtractor.run('test_branch', 'master') as string[];
      expect(migrationFiles.every(file => file.includes('src/migration'))).toBe(true);
    });
  });
});
