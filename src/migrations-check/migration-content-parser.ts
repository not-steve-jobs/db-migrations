import stripComments from 'strip-comments';
import { ClassDeclaration, Project, SourceFile } from 'ts-morph';

import { MinimumLogger, Utils } from './utils';
interface MigrationContentParser {
  parse(): string;
  getClassName(): string;
}

export class MigrationUpContentParser implements MigrationContentParser {

  private migrationFile: SourceFile;
  public static MIGRATION_UP_METHOD = 'up';
  private logger: MinimumLogger;
  private migrationClass: ClassDeclaration;

  private project: Project;
  constructor(
    private pathToMigrationFile: string,
    options: {
      logger?: MinimumLogger;
      tsConfigPath?: string;
    } = {}
  ) {

    this.logger = options.logger || Utils.createLogger(false);

    this.project = new Project({
      tsConfigFilePath: options.tsConfigPath || 'tsconfig.json',
      compilerOptions: {
        removeComments: true,
      },
    });

    this.migrationFile = this.project.getSourceFileOrThrow(this.pathToMigrationFile);

    const declaredClassesInFile = this.migrationFile.getClasses();

    if (!declaredClassesInFile.length) {
      throw new Error(`There is no class in the migration file: ${this.pathToMigrationFile}`);
    }

    if (declaredClassesInFile.length > 1) {
      throw new Error('There should be only one exported class which contains content of migration');
    }

    this.migrationClass = declaredClassesInFile[0];
  }

  public parse(): string {
    this.logger.info(`parse migration file: ${this.pathToMigrationFile}`);
    const upMethod = this.migrationClass.getMethodOrThrow(MigrationUpContentParser.MIGRATION_UP_METHOD);

    return stripComments(upMethod.getText());
  }

  public getClassName(): string {
    this.logger.info(`getting class name of migration file: ${this.pathToMigrationFile}`);

    return this.migrationClass.getNameOrThrow();
  }
}
