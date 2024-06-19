import { MigrationInterface, QueryRunner } from 'typeorm';

import { getDeleteActivityQuery,
  getInsertActivityQuery } from './data/1687770393521-add-questionnaire-activity-corporateBank/activities';


export class AddQuestionnaireActivity1687770393521 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const activityInsertQuery = getInsertActivityQuery(
      { productName: 'corporateBank', key: 'questionnaire', skip: false, order: 1, enabled: false }
    );

    await queryRunner.query(activityInsertQuery);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const activityDeleteQuery = getDeleteActivityQuery('corporateBank', 'questionnaire');

    await queryRunner.query(activityDeleteQuery);
  }
}
