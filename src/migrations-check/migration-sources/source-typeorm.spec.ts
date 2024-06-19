import { SourceTypeormExtractor } from './source-typeorm';

jest.spyOn(SourceTypeormExtractor.prototype, 'getAllMigrationFiles').mockReturnValue([]);

const typeormShowCmdOutput = `
[X] 49 AddDefaultValuesForNonNullableFieldsInPaymentsTable1698224673579
[X] 50 SchedulerJobsTable1698746809706
[ ] ProviderMethodFieldsAdminApiNullable1699258431338
`;

jest.spyOn(SourceTypeormExtractor.prototype, 'runMigrationShowCommand').mockReturnValue(typeormShowCmdOutput);

describe('migrations-check', () => {
  describe('SourceTypeormExtractor', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should send back list of pending migrations', async () => {
      const migrationFiles = [
        '1698746809706-scheduler-jobs-table.ts',
        '1698224673579-add_default_values_for_non_nullable_fields_in_payments_table.ts',
        '1699622182280-providerMethodFields-adminApi-nullable.ts',
      ];
      jest.spyOn(SourceTypeormExtractor.prototype, 'getAllMigrationFiles').mockReturnValue(migrationFiles);
      const sourceExtractor = new SourceTypeormExtractor();
      const pendingMigrationFiles = await sourceExtractor.run();
      const resultMigrationFiles = pendingMigrationFiles.map(item => item.split('/').slice(-3).join('/'));
      expect(resultMigrationFiles).toEqual([
        'src/migration/1699622182280-providerMethodFields-adminApi-nullable.ts',
      ]);
    });
  });
});
