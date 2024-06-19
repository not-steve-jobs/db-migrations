import { MigrationInterface, QueryRunner } from 'typeorm';

import { runSqlQueries } from '../src/queryUtils';

import {
  deleteQuestionnaire, deleteQuestionnaireQuestionnaireGroupsOrder,
  getInsertQuestionnaireGroupQuery,
  getSelectQuestionnaireGroupsByPersonalDetailsPartnersQuery,
  getSelectQuestionnaireGroupsByTermsAndConditionsPartnersQuery,
  getSelectQuestionnaireQuestionnairesQuery,
  insertQuestionnaire,
  insertQuestionnaireQuestionnaireGroupsOrder,
} from './data/1707302414664-add-partners-questionnaire-for-new-cri-authority/questionnaireCriPartners';

export class AddPartnerQuestionnaireForNewCriAuthority1707302414664 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    let questionnaireGroupsPersonalDetailsPartners = await queryRunner.query(getSelectQuestionnaireGroupsByPersonalDetailsPartnersQuery);
    if (!questionnaireGroupsPersonalDetailsPartners.length) {
      await queryRunner.query(getInsertQuestionnaireGroupQuery('personalDetailsPartners', 'Personal Details'));
      questionnaireGroupsPersonalDetailsPartners = await queryRunner.query(getSelectQuestionnaireGroupsByPersonalDetailsPartnersQuery);
    }
    
    let questionnaireGroupsTermsAndConditionsPartners = await queryRunner.query(getSelectQuestionnaireGroupsByTermsAndConditionsPartnersQuery);
    if (!questionnaireGroupsTermsAndConditionsPartners.length) {
      await queryRunner.query(getInsertQuestionnaireGroupQuery('termsAndConditionsPartners', 'Terms And Conditions'));
      questionnaireGroupsTermsAndConditionsPartners = await queryRunner.query(getSelectQuestionnaireGroupsByTermsAndConditionsPartnersQuery);
    }
    
    await queryRunner.query(insertQuestionnaire);
    const questionnaire = await queryRunner.query(getSelectQuestionnaireQuestionnairesQuery);
    
    await runSqlQueries([
      insertQuestionnaireQuestionnaireGroupsOrder(questionnaireGroupsPersonalDetailsPartners[0].id, questionnaire[0].id, '1'),
      insertQuestionnaireQuestionnaireGroupsOrder(questionnaireGroupsTermsAndConditionsPartners[0].id, questionnaire[0].id, '2'),
    ], queryRunner);
  }
    
  public async down(queryRunner: QueryRunner): Promise<void> {
    const questionnaire = await queryRunner.query(getSelectQuestionnaireQuestionnairesQuery);
    if (questionnaire.length) {
      const questionnaireGroupsPersonalDetailsPartners = await queryRunner.query(getSelectQuestionnaireGroupsByPersonalDetailsPartnersQuery);
      if (questionnaireGroupsPersonalDetailsPartners.length) {
        await queryRunner.query(deleteQuestionnaireQuestionnaireGroupsOrder(questionnaire[0].id,questionnaireGroupsPersonalDetailsPartners[0].id));
      }
      const questionnaireGroupsTermsAndConditionsPartners = await queryRunner.query(getSelectQuestionnaireGroupsByTermsAndConditionsPartnersQuery);
      if (questionnaireGroupsTermsAndConditionsPartners.length) {
        await queryRunner.query(deleteQuestionnaireQuestionnaireGroupsOrder(questionnaire[0].id,questionnaireGroupsTermsAndConditionsPartners[0].id));
      }
      await queryRunner.query(deleteQuestionnaire(questionnaire[0].id));
    }
  }
}
