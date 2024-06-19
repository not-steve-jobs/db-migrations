import { Utils } from './utils';

const PATTERNS = {
  DROP: 'DROP\\s*(?:COLUMN|TABLE)',
  TRUNCATE: 'TRUNCATE\\s*(?:TABLE)?\s*',
  DELETE: 'DELETE\\s+\\S*',
};

const ALL_PATTERNS = Object.values(PATTERNS);

const testMigrationFile = `
import { MigrationInterface, QueryRunner } from 'typeorm';
import { tolerateQuery } from '../src/queryUtils';

export class ProviderMethodFieldsAdminApiNullable1699258431338 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
      // Delete duplicates based on combination providerId + transactionType + key
      await queryRunner.query(\`
          DELETE pmf1
          FROM cp_providerMethodFields pmf1
      \`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(\`DELETE from cp_providerMethodFields where adminApiId is null\`);
  }
}`;

describe('migrations-check', () => {
  describe('Utils.grep', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should match only those lines which are declared in patterns', () => {
      const result = Utils.stdoutToLines(Utils.grep(ALL_PATTERNS, testMigrationFile));
      expect(result).toEqual([
        '(standard input):8:      // Delete duplicates based on combination providerId + transactionType + key',
        '(standard input):10:          DELETE pmf1',
        '(standard input):16:      await queryRunner.query(`DELETE from cp_providerMethodFields where adminApiId is null`);',
      ]);
    });

    it('should return empty result if pattern is empty string', () => {
      const result = Utils.stdoutToLines(Utils.grep([''], testMigrationFile));
      expect(result).toEqual([]);
    });
  });
});
