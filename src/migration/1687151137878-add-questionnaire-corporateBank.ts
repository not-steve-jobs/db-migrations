import { MigrationInterface, QueryRunner } from 'typeorm';

import { runSqlQueries } from '../src/queryUtils';

import {
  findCompanyIndustrySectorQuestion,
  getSelectQuestionQueries,
  getSelectQuestionnaireGroupsQueries,
  getSelectQuestionnaireQuestionnairesQuery,
  questionnaireOptionsValue,
  questionnaireQuestionsValue,
} from './data/1687151137878-add-questionnaire-corporateBank/questionnaireCorporateBank';

export class addQuestionnaireCorporateBank1687151137878 implements MigrationInterface {
  public name = addQuestionnaireCorporateBank1687151137878.name;
  public async up(queryRunner: QueryRunner): Promise<void> {
    // <-------- Insert questionnaireQuestionnaires and questionnaireGroups and questionnaireQuestions -------->
    const insertQuestionnaire = `INSERT INTO questionnaireQuestionnaires (
        \`authority\`, \`brand\`, \`country\`, \`enabled\`, \`platform\`, \`product\`, \`published\`,\`tag\`, \`title\`, \`version\`
    ) VALUES (
        'cbb',  NULL, NULL, 1, NULL, 'corporateBank', 1, NULL, 'CBB corporateBank Questionnaire', NULL
    )`;

    const insertQuestionnaireGroup = `INSERT INTO questionnaireGroups (
        \`descriptionKey\`, \`enabled\`, \`footerDescription\`, \`footerKey\`, \`groupKey\`, \`groupType\`, \`headerDescription\`,\`headerKey\`, \`imageKey\`,
        \`immediate\`, \`published\`, \`title\`
    ) VALUES (
        NULL, 1, NULL, 'grpInitialCorporateBankFooter', 'grpInitialCorporateBank', 'normal', NULL, 'grpInitialCorporateBankHeader',
        'grpInitialCorporateBankImg', 1, 1, 'Register a new profile'
    )`;

    const insertQuestionnaireQuestions = questionnaireQuestionsValue.map(elem => {
      if (elem.projectedQuestionKey === null) {
        return `INSERT INTO questionnaireQuestions (
            \`description\`, \`enabled\`, \`fieldType\`, \`linkKey\`, \`linkValue\`, \`mandatory\`,\`mandatoryCheckBoxValue\`,\`mandatoryConditions\`,
            \`published\`, \`questionKey\`, \`readOnly\`, \`validationKey\`,\`validationPattern\`, \`hidden\`
        ) VALUES (
            '${elem.description}',  1, '${elem.fieldType}', NULL, NULL, ${elem.mandatory}, NULL, 'null', 1, '${elem.questionKey}', 0, NULL, NULL, 0
        )`;
      }
      return `INSERT INTO questionnaireQuestions (
            \`description\`, \`enabled\`, \`fieldType\`, \`linkKey\`, \`linkValue\`, \`mandatory\`,\`mandatoryCheckBoxValue\`,\`mandatoryConditions\`,
            \`projectedQuestionKey\`, \`published\`, \`questionKey\`, \`readOnly\`, \`validationKey\`,\`validationPattern\`, \`hidden\`
        ) VALUES (
            '${elem.description}',  1, '${elem.fieldType}', NULL, NULL, ${elem.mandatory}, NULL, 'null', '${elem.projectedQuestionKey}', 1,
            '${elem.questionKey}', 0, NULL, NULL, 0
        )`;
    });

    await runSqlQueries([insertQuestionnaire, insertQuestionnaireGroup, ...insertQuestionnaireQuestions], queryRunner);

    // <-------- Select Questionnaire and QuestionnaireGroup and questionnaireQuestions -------->
    const selectQuestionnaireID = getSelectQuestionnaireQuestionnairesQuery();
    const selectQuestionnaireGroupID = getSelectQuestionnaireGroupsQueries();
    const selectQuestionnaireQuestions = getSelectQuestionQueries();

    const questionnaire = await queryRunner.query(selectQuestionnaireID);
    const questionnaireGroup = await queryRunner.query(selectQuestionnaireGroupID);

    const questionnaireQuestionsResult = [];
    for (const sqlQuery of selectQuestionnaireQuestions) {
      const questionnaireQuestions = await queryRunner.query(sqlQuery);
      questionnaireQuestionsResult.push(questionnaireQuestions[0]);
    }

    const companyIndustrySectorQuestion = findCompanyIndustrySectorQuestion(questionnaireQuestionsResult);

    // <-------- Insert questionnaireQuestionnaireGroupsOrder and questionnaireGroupQuestionsOrder and questionnaireOptions -------->
    const insertQuestionnaireQuestionnaireGroupsOrder = `INSERT INTO questionnaireQuestionnaireGroupsOrder (
        \`groupId\`, \`questionnaireId\`, \`orderPriority\`
    ) VALUES (
        '${questionnaireGroup[0].id}', '${questionnaire[0].id}', 1
    )`;

    const insertQuestionnaireGroupQuestionsOrder = questionnaireQuestionsResult.map(elem => `INSERT INTO questionnaireGroupQuestionsOrder (
        \`groupId\`, \`questionId\`, \`orderPriority\`
    ) VALUES (
        '${questionnaireGroup[0].id}', '${elem.id}', 1)
    `);

    const insertQuestionnaireOptions = questionnaireOptionsValue.map(elem => `INSERT INTO questionnaireOptions (
        \`description\`, \`enabled\`, \`optionKey\`, \`orderPriority\`, \`published\`, \`questionId\`
    ) VALUES (
        '${elem.description}', 1, '${elem.optionKey}', '${elem.orderPriority}', 1, '${companyIndustrySectorQuestion?.id}')
    `);

    await runSqlQueries([insertQuestionnaireQuestionnaireGroupsOrder, ...insertQuestionnaireGroupQuestionsOrder, ...insertQuestionnaireOptions], queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // <-------- Select Questionnaire and QuestionnaireGroup and questionnaireQuestions -------->
    const selectQuestionnaireID = getSelectQuestionnaireQuestionnairesQuery();
    const selectQuestionnaireGroupID = getSelectQuestionnaireGroupsQueries();

    const questionnaire = await queryRunner.query(selectQuestionnaireID);
    const questionnaireGroup = await queryRunner.query(selectQuestionnaireGroupID);

    const selectQuestionnaireQuestions = getSelectQuestionQueries();

    const questionnaireQuestionsResult = [];
    for (const sqlQuery of selectQuestionnaireQuestions) {
      const questionnaireQuestions = await queryRunner.query(sqlQuery);
      questionnaireQuestionsResult.push(questionnaireQuestions[0]);
    }

    const companyIndustrySectorQuestion = findCompanyIndustrySectorQuestion(questionnaireQuestionsResult);

    // <-------- Delete all(questionnaireGroupQuestionsOrder, questionnaireQuestionnaireGroupsOrder, questionnaireOptions FIRST)  -------->
    if (questionnaire.length && questionnaireGroup.length && questionnaireQuestionsResult.length && companyIndustrySectorQuestion) {
      const deleteQuestionnaireGroupQuestionsOrder = questionnaireQuestionsResult.map(elem => `DELETE FROM questionnaireGroupQuestionsOrder WHERE
        groupId = '${questionnaireGroup[0].id}' AND questionId='${elem.id}'`);
      const deleteQuestionnaireQuestionnaireGroupsOrder = `DELETE FROM questionnaireQuestionnaireGroupsOrder WHERE groupId = '${questionnaireGroup[0].id}'
        AND questionnaireId = '${questionnaire[0].id}'`;
      const deleteQuestionnaireOptions = `DELETE FROM questionnaireOptions WHERE questionId='${companyIndustrySectorQuestion.id}'`;

      const deleteQuestionnaireQuestions = questionnaireQuestionsResult.map(elem => `DELETE FROM questionnaireQuestions WHERE id='${elem.id}'`);
      const deleteQuestionnaire = `DELETE FROM questionnaireQuestionnaires WHERE id='${questionnaire[0].id}'`;
      const deleteQuestionnaireGroup = `DELETE FROM questionnaireGroups WHERE id='${questionnaireGroup[0].id}'`;

      await runSqlQueries([...deleteQuestionnaireGroupQuestionsOrder, deleteQuestionnaireQuestionnaireGroupsOrder, deleteQuestionnaireOptions,
        ...deleteQuestionnaireQuestions, deleteQuestionnaire, deleteQuestionnaireGroup ], queryRunner);
    }
  }

}
