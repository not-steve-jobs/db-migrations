# MW database migration tool

## Initial Setup

After starting the middleware dependency services (especially MariaDB) please run the following commands:
* npm run build
* npm run db:recreate-counter-generator-schema
* npm run db:recreate-local-dev-schemas

## Testing

This command will create test schemas, run the migrations, run the seeds, run the rollbacks, and check if everything went well.
* npm run test

## Docker Setup

Build docker image
* docker build -t direct/migrations .

Then start container
* docker run -it --entrypoint "/bin/sh" --net=host --name migrations direct/migrations
OR
* docker run -it --entrypoint "/bin/sh" --net=host --name migrations docker-direct.artifactory.fxpro.local/direct/db-migrations:{version}

Then execute database scripts
* npm run typeorm:migration:run
* npm run typeorm:migration:show
* npm run typeorm:migration:revert

You can also run seeds but that will prevent you from deleting the seeded tables:
* npm run typeorm:seed


## Migrations

Migration are responsible for keeping the database schema, and preset data consistent across all environments.

### How to add a new migration

For this example let's add a column to the products table.

We first need to find the Products.ts entity under typeorm/entity/product/Products.ts folder.

So let's add the following column with the product's description:
```typescript
  @Column('varchar', { length: 255 })
  public description: string;
```

Now run:

`npm run typeorm:migration:generate`

You should get a new file created under typeorm/migration folder called `timestamp-migration-name.ts`.

Notice the up function which contains the SQL scripts required for your schema to match your entity.

And the down function which contains the SQL scripts that you need to run if you want to revert your changes.

Rename the file to something like timestamp-add-products-description.ts and also rename the class name to AddProductsDescriptionTimestamp.

Also adjust the name property to match the name of your class, and make it a public property.

Please avoid using @OneToOne helper from TypeOrm in entities. Instead add @Index over the related property.

When adjusting column types in entities, watch out for 'DELETE' statements that will be added in the up function, because they will cause DATA LOSS if applied, and you should adjust them and use ALTER statements instead.

In order to run your migration locally please run:

`npm run typeorm:migration:run`

You can check if your schema matches your entities by running:

`npm run typeorm:migration:check`

If you receive the following output everything is OK and your migration has been successfully applied to your local database.
```shell
No changes in database schema were found
```

Now it is time to commit your changes, push, and using the feature tag, test it on mock environment. See [database migrations documentation
](#how-to-run-database-migrations-on-other-environments).

### How to run database migrations on other environments

https://fxpropm.atlassian.net/wiki/spaces/DIR2/pages/3375497246/Database+Migrations

### Commands

* npm run typeorm:migration:create

This command will create an empty migration. Please adjust the name of the file according to your migration.
Also in the migration class, please provide a name public property:
```
  public name = AddProductAvailabilityCorporateBank1686737466967.name;
```

When you create a new table, or alter an existing table through a migration, you will need to update the relevant entity.

* npm run typeorm:migration:check

Uses the entities, to verify the database schema. Will show queries to make the schema consistent with the entities,
or a message that there are no differences.

* npm run typeorm:migration:run

Will run the migrations located under the typeorm/migration folder.

### Migration conventions

When writing a migration use a raw sql script. Also avoid using entities in a migration.

When creating foreign keys please follow the following template: fkQQMFQuestionnaireQuestionsIdIdx
In this example QQMF represents the initials of the table questionnaireQuestionsMandatoryFor. It is optional though, add it if you have a name conflict between multiple table keys.

When creating unique keys please follow the following template: pushNotificationsUniqueTag
Where pushNotifications is the table name, Unique or Unq, and then the Column name.

## Seeds

Seeds are responsible for adding test data to development and mock environments.

### Commands

* npm run typeorm:seed

Will run the seeders located under the typeorm/seeds folder.

### Seed gotchas

* Make sure that when you have a tinyint column instead of passing true you should pass 1.
* When you seed tables with date fields, because the seed data contain just the date, and the database data contain the date time, this project is unable to distinguish if data has changed, so it always updates the data.
* Newer mariadb versions will throw error when you try to seed a table and you don't provide a value for a tinyint field that doesn't allow nulls. In older versions it automatically added the value 0.

## Adjusting the env.properties file on other environments

If you need to adjust the environment variables available to this project, please adjust the section with db-migrations properties in common.properties of config/direct project.


## migrations-check CLI tool description
The migrations-check tool is used to check for dangerous migration files.
Migration files can be dangerous for 2 reasons:
### checks
1. `--checks=drop-statement` When migration file contains unsafe sql statements which can lead to data loss
1. `--checks=heavy-tables` When migration file contains unsafe sql statements which can lead to unintentional lock a table for some period of time.
### source of migration files
1. `--source=git` get difference between master and feature branch or commit and then extract migration files
1. `--source=typeorm` get pending migration files in order to see which migrations are missing in a environment
```bash
Usage: migrations-check --source=<git|typeorm> [--branchOrCommit=branch_name_or_commit] [--mainBranchOrCommit=branch_name_or_commit] --checks=<heavy-tables,drop-statement>

various checks before migration run

Options:
  -v, --version                         output the current version
  --source <value>                      source from where to grab migration files (choices: "git", "typeorm")
  --checks <comma_separated_values...>  comma-separated list of checks to be applied
  --branchOrCommit <value>              name of target branch or hash of commit, (required when --source=git)
  --mainBranchOrCommit <value>          main branch name or hash of commit, (required when --source=git)
  --silent                              In silent mode only JSON output will be printed (default: false)
  -h, --help                            display help for command
```

### development (add new checks and sources)
#### add new check
1. create another file in checks dir, and name it properly.
2. put new keyword here
```typescript
export enum RegisteredCheckOptionValue {
  HeavyTables = 'heavy-tables',
  DropStatement= 'drop-statement'
  NewCheck='new-check'
}
```
3. new check should implement the type below

```typescript
export type CheckAction = {
  run(file: string): Promise<CheckResult>;
  logger: MinimumLogger;
}
```
4. register new value for the --checks option here
```typescript
const mapCheckOptionValueToAction: Record<string, CheckAction> = {
  [RegisteredCheckOptionValue.HeavyTables]: new HeavyTablesCheckAction(),
  [RegisteredCheckOptionValue.DropStatement]: new DropStatementCheckAction(),
  [RegisteredCheckOptionValue.NewCheck]: new NewCheck()
};
```
#### add new source
Adding a new migration file source is done in much the same way as for checks.
