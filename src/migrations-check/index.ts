process.env.SILENT_MODE = '1';
import { Command, Option, program } from 'commander';

import { CheckAction, CheckResult, RegisteredCheckOptionValue, RegisteredSourceOptionValue, SourceExtractor, Utils } from './utils';
import { DropStatementCheckAction } from './checks/drop-statement';
import { HeavyTablesCheckAction } from './checks/heavy-table';
import { MigrationNameCheckAction } from './checks/migration-name';
import { SourceGitExtractor } from './migration-sources/source-git';
import { SourceTypeormExtractor } from './migration-sources/source-typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../../package.json');

// add new check here and then create corresponding file in checks dir
const mapCheckOptionValueToAction: Record<string, CheckAction> = {
  [RegisteredCheckOptionValue.HeavyTables]: new HeavyTablesCheckAction(),
  [RegisteredCheckOptionValue.DropStatement]: new DropStatementCheckAction(),
  [RegisteredCheckOptionValue.MigrationName]: new MigrationNameCheckAction(),
};

// add new source here and then create corresponding file in migration-sources dir
const mapSourceOptionValueToSourceExtractor: Record<string, SourceExtractor<[string,string]>> = {
  [RegisteredSourceOptionValue.Git]: new SourceGitExtractor(),
  [RegisteredSourceOptionValue.Typeorm]: new SourceTypeormExtractor(),
};

type CheckActionArgument = { checkAction: CheckAction; name: RegisteredCheckOptionValue };

const checksOptionArgParser = (commaSeparatedValues: string): CheckActionArgument[] => {
  try {
    const parsed = commaSeparatedValues.split(',');
    const commands: CheckActionArgument[] = [];

    for (const optionValueName of parsed) {
      if (!(optionValueName in mapCheckOptionValueToAction)) {
        throw new Error(`invalid values for --checks. Possible values are ${Object.keys(mapCheckOptionValueToAction).join(',')}`);
      }
      commands.push({ checkAction: mapCheckOptionValueToAction[optionValueName], name: optionValueName as RegisteredCheckOptionValue });
    }

    return commands;
  } catch (err) {
    Utils.errorHandler(err);
    return [];
  }
};

const checksOption = new Option('--checks <comma_separated_values...>', 'comma-separated list of checks to be applied')
  .makeOptionMandatory()
  .argParser(checksOptionArgParser);

const mainAction = async (
  options: {
    source: RegisteredSourceOptionValue;
    checks: CheckActionArgument[];
    branchOrCommit?: string;
    mainBranchOrCommit?: string;
    silent: boolean;
    runQuery: boolean;
  }
): Promise<void> => {
  if (options.branchOrCommit && options.source !== RegisteredSourceOptionValue.Git) {
    return Promise.reject(`--branchOrCommit <value> only makes sense with --source=${RegisteredSourceOptionValue.Git}`);
  }

  if (options.mainBranchOrCommit && options.source !== RegisteredSourceOptionValue.Git) {
    return Promise.reject(`--mainBranchOrCommit <value> only makes sense with --source=${RegisteredSourceOptionValue.Git}`);
  }

  if (!options.branchOrCommit && options.source === RegisteredSourceOptionValue.Git) {
    return Promise.reject(`--branchOrCommit <value> is required when --source=${RegisteredSourceOptionValue.Git}`);
  }

  if (!options.mainBranchOrCommit && options.source === RegisteredSourceOptionValue.Git) {
    return Promise.reject(`--mainBranchOrCommit <value> is required when --source=${RegisteredSourceOptionValue.Git}`);
  }

  const hasHeavyCheck = options.checks.find(
    (check: CheckActionArgument) => check.name === RegisteredCheckOptionValue.HeavyTables
  );

  if (options.runQuery && !hasHeavyCheck) {
    return Promise.reject((`--runQuery is available only when --check=heavy-table`));
  }

  const logger = Utils.createLogger(options.silent);

  const targetSourceExtractor = mapSourceOptionValueToSourceExtractor[options.source];
  targetSourceExtractor.silent = options.silent;
  const checkResults: CheckResult[] = [];
  const files = await targetSourceExtractor.run(options.branchOrCommit as string, options.mainBranchOrCommit as string);

  for (const file of files) {
    for (const check of options.checks) {
      check.checkAction.logger = logger;
      check.checkAction.options = { runQuery: options.runQuery };
      checkResults.push(await check.checkAction.run(file));
    }
  }

  checkResults.sort((a,b) => {
    if (a.status === 'error' && b.status === 'ok') {
      return 1;
    }
    if (a.status === 'ok' && b.status === 'error') {
      return -1;
    }
    if (a.status === b.status) {
      return 0;
    }
    return 0;
  });

  logger.info('print check results:');

  if (checkResults.some(checkResult => checkResult.status === 'error')) {
    logger.error(JSON.stringify(checkResults, null, 2));
    process.exitCode = 1;
    return;
  }

  console.log(JSON.stringify(checkResults, null, 2));
};

const sourceOption = new Option('--source <value>', 'source from where to grab migration files')
  .choices(Object.values(RegisteredSourceOptionValue))
  .makeOptionMandatory();


const branchOrCommitOption = new Option('--branchOrCommit <value>', 'name of target branch or hash of commit, (required when --source=git)');
const mainBranchOrCommitOption = new Option('--mainBranchOrCommit <value>', 'main branch name or hash of commit, (required when --source=git)');

const silentOption = new Option('--silent', 'In silent mode only JSON output will be printed').default(false);

const heavyTableRunQueryOption = new Option('--runQuery', 'parameter for heavy-table check to run sql query and get the table sizes')
  .default(false);

export function createApp(): Command {
  return program.createCommand()
    .name('migrations-check')
    // eslint-disable-next-line max-len
    .usage(`--source=<git|typeorm> [--branchOrCommit=branch_name_or_commit] [--mainBranchOrCommit=branch_name_or_commit] --checks=<heavy-tables,drop-statement>`)
    .description('various checks before migration run')
    .version(packageJson.version, '-v, --version', 'output the current version')
    .addOption(sourceOption)
    .addOption(checksOption)
    .addOption(branchOrCommitOption)
    .addOption(mainBranchOrCommitOption)
    .addOption(silentOption)
    .addOption(heavyTableRunQueryOption)
    .action(options => mainAction(options).catch(Utils.errorHandler));
}

export function run(): void {
  const app = createApp();

  if (!process.argv.length) {
    app.outputHelp();
  }

  app.parse();
}
