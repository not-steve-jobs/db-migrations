import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProfileMarketingDataTable1698137190804 implements MigrationInterface {
  public name = 'AddProfileMarketingDataTable1698137190804';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`profileMarketingData\` (
      \`id\` int(10) NOT NULL AUTO_INCREMENT,
      \`profileId\` char(36) NOT NULL,
      \`invitedBy\` varchar(255) NOT NULL,
      \`params\` longtext NOT NULL,
      \`created\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      \`updated\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
      INDEX \`fkProfileMarketingDataProfilesIdx\` (\`profileId\`),
      PRIMARY KEY (\`id\`)) ENGINE=InnoDB DEFAULT CHARSET=utf8`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`fkProfileMarketingDataProfilesIdx\` ON \`profileMarketingData\``);
    await queryRunner.query(`DROP TABLE \`profileMarketingData\``);
  }
}
