import { MigrationNameCheckAction } from './migration-name';

const getClassNameSpy = jest.fn();

jest.mock('../migration-content-parser', () => ({
  MigrationUpContentParser: jest.fn().mockImplementation(() => ({
    getClassName: getClassNameSpy,
  })),
}));

describe('migrations-check', () => {
  describe('MigrationNameCheckAction', () => {
    beforeEach(() => {
      getClassNameSpy.mockReset();
      jest.clearAllMocks();
    });

    it('should return ok when migration names are ok', async () => {
      // Given
      getClassNameSpy.mockReturnValueOnce('ClassnameWithSameTimestampAsFilename1707818778008');
      const checkAction = new MigrationNameCheckAction();

      // When
      const result = await checkAction.run('1707818778008-mocked-migration-file.ts');

      // Then
      expect(result).toStrictEqual({
        status: 'ok',
        filename: '1707818778008-mocked-migration-file.ts',
        checkType: 'migration-name',
      });
    });

    it("should return error when filename timestamp doesn't match class name timestamp", async () => {
      // Given
      getClassNameSpy.mockReturnValueOnce('ClassnameWithDifferentTimestampThanFilename1707818778025');
      const checkAction = new MigrationNameCheckAction();

      // When
      const result = await checkAction.run('1707818778055-mocked-migration-file.ts');

      // Then
      expect(result).toStrictEqual({
        status: 'error',
        filename: '1707818778055-mocked-migration-file.ts',
        checkType: 'migration-name',
        reasons: [
          {
            lineNumber: 0,
            reason: "Filename and classname timestamp don't match (1707818778055 !== 1707818778025)",
          },
        ],
      });
    });

    it('should return error when filename timestamp has non numeric digits', async () => {
      // Given
      getClassNameSpy.mockReturnValueOnce('ClassnameWithTimestampWithNumericDigits1707818778025');
      const checkAction = new MigrationNameCheckAction();

      // When
      const result = await checkAction.run('170781877805A-mocked-migration-file.ts');

      // Then
      expect(result).toStrictEqual({
        status: 'error',
        filename: '170781877805A-mocked-migration-file.ts',
        checkType: 'migration-name',
        reasons: [
          {
            lineNumber: 0,
            reason: 'Filename and classname timestamp must have length of 13 characters and contain only numbers (170781877805A, 1707818778025)',
          },
        ],
      });
    });

    it('should return error when classname timestamp has non numeric digits', async () => {
      // Given
      getClassNameSpy.mockReturnValueOnce('ClassnameWithTimestampWithNonNumericDigitsB707818778025');
      const checkAction = new MigrationNameCheckAction();

      // When
      const result = await checkAction.run('1707818778053-mocked-migration-file.ts');

      // Then
      expect(result).toStrictEqual({
        status: 'error',
        filename: '1707818778053-mocked-migration-file.ts',
        checkType: 'migration-name',
        reasons: [
          {
            lineNumber: 0,
            reason: 'Filename and classname timestamp must have length of 13 characters and contain only numbers (1707818778053, B707818778025)',
          },
        ],
      });
    });

    it('should return error when filename has invalid timestamp due to length', async () => {
      // Given
      getClassNameSpy.mockReturnValueOnce('ClassnameWithTimestampWithNumericDigits1707818378025');
      const checkAction = new MigrationNameCheckAction();

      // When
      const result = await checkAction.run('170783877805');

      // Then
      expect(result).toStrictEqual({
        status: 'error',
        filename: '170783877805',
        checkType: 'migration-name',
        reasons: [
          {
            lineNumber: 0,
            reason: 'Filename and classname timestamp must have length of 13 characters and contain only numbers (170783877805, 1707818378025)',
          },
        ],
      });
    });

    it('should return error when classname has invalid timestamp due to length', async () => {
      // Given
      getClassNameSpy.mockReturnValueOnce('ClassnameWithTimestampWithNumericDigits170781837802');
      const checkAction = new MigrationNameCheckAction();

      // When
      const result = await checkAction.run('1707838778060-a-migration.ts');

      // Then
      expect(result).toStrictEqual({
        status: 'error',
        filename: '1707838778060-a-migration.ts',
        checkType: 'migration-name',
        reasons: [
          {
            lineNumber: 0,
            reason: 'Filename and classname timestamp must have length of 13 characters and contain only numbers (1707838778060, s170781837802)',
          },
        ],
      });
    });
  });
});
