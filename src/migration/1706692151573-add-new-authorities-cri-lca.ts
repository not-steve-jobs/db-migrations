import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewAuthoritiesCriLca1706692151573 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO authorities (name, code)
      VALUES
      ('Costa Rica', 'cri'),
      ('Saint Lucia', 'lca');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM authorities
      WHERE code IN ('cri', 'lca');
    `);
  }
}
