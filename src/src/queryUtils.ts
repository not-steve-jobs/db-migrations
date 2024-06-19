import { QueryRunner } from 'typeorm';

export async function runSqlQueries(sqlQueries: string[], queryRunner: QueryRunner): Promise<void> {
  for (const sqlQuery of sqlQueries) {
    await queryRunner.query(sqlQuery);
  }
}

export async function tolerateQuery(queryRunner: QueryRunner, sql: string): Promise<void> {
  // Make sure that query doesn't break the migration.
  // Needed to tolerate some foreign keys that were missing due to half-run migration.
  try {
    await queryRunner.query(sql);
  } catch (e) {
    console.log(`Tolerating query: ${sql}`);
    console.log(e);
  }
}
