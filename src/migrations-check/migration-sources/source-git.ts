import * as path from 'path';
import { spawnSync } from 'child_process';

import { SourceExtractor, Utils } from '../utils';

export class SourceGitExtractor implements SourceExtractor<[string,string]> {

  public silent = false;

  public isBranchOrCommitExists(branchOrCommit: string, repoDir: string): boolean {
    const { error, status } = spawnSync('git', [
      '-C',
      repoDir,
      'rev-parse',
      '--verify',
      branchOrCommit,
    ], { encoding: 'utf8', stdio:'ignore' });
    return !error && status === 0;
  }

  private shouldSkipDeletedMigrationFiles(modifiedFlag: string): boolean {
    // 'D' means deleted from
    return modifiedFlag === 'D';
  }

  public runDiffCommand(repoDir: string, branchOrCommit: string, mainBranchOrCommit: string): string | Error {
    const gitDiffCmdText = `git -C ${repoDir} diff --name-status "${mainBranchOrCommit}..${branchOrCommit}"`;
    if (!this.silent) {
      console.info('command to run ' + gitDiffCmdText);
    }
    const { stderr, stdout, error } = spawnSync('git',[
      '-C',
      repoDir,
      'diff',
      '--name-status',
      `${mainBranchOrCommit}..${branchOrCommit}`,
    ], {
      encoding: 'utf8',
    });
    if (stderr) {
      return Utils.handleCmdError(gitDiffCmdText, stderr);
    }
    if (error) {
      return error;
    }
    return stdout;
  }

  public async run(branchOrCommit: string, mainBranchOrCommit: string): Promise<string[]> {
    const repoDir = path.resolve(path.join(__dirname, '../../../'));
    if (!this.isBranchOrCommitExists(branchOrCommit, repoDir)) {
      return Promise.reject(`branch or commit '${branchOrCommit}' specified in --source=git is not found`);
    }

    const diffCmdOutput = this.runDiffCommand(repoDir, branchOrCommit, mainBranchOrCommit);

    // rethrow error
    if (diffCmdOutput instanceof Error) {
      return Promise.reject(diffCmdOutput);
    }

    const pattern = Utils.getMigrationsPathPattern();
    const excludeDataDirPattern = new RegExp(`${Utils.MIGRATIONS_DIR}data/`);

    const files = diffCmdOutput
      .split('\n')
      .flatMap(line => {
        const [ modifiedFlag, fileName ] = line.split(/\s+/);
        if (!modifiedFlag || this.shouldSkipDeletedMigrationFiles(modifiedFlag)) {
          return [];
        }

        return [fileName];
      }).filter(pathToFile => {
        const result = pattern.test(pathToFile) && !excludeDataDirPattern.test(pathToFile);
        return result;
      });

    return Promise.resolve(files);
  };

}
