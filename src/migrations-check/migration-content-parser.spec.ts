import path from 'path';

import { MigrationUpContentParser } from './migration-content-parser';

describe('migrations-check', () => {
  describe('MigrationUpContentParser', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should take content of up method', () => {
      const contentParser = new MigrationUpContentParser(path.join(__dirname, 'test-migration-file.ts'));
      expect(contentParser.parse()).not.toContain('public async down');
    });

    it('should delete all comments from migrations file', () => {
      const contentParser = new MigrationUpContentParser(path.join(__dirname, 'test-migration-file.ts'));
      expect(contentParser.parse()).not.toContain('//');
      expect(contentParser.parse()).not.toContain('/*');
      expect(contentParser.parse()).not.toContain('*/');
    });

    it('should get class name of migration', () => {
      const contentParser = new MigrationUpContentParser(path.join(__dirname, 'test-migration-file.ts'));
      expect(contentParser.getClassName()).toBe('ProviderMethodFieldsAdminApiNullable1699258431338');
    });
  });
});
