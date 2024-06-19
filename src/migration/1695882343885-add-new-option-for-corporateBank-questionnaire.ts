import { MigrationInterface, QueryRunner } from 'typeorm';

import { runSqlQueries } from '../src/queryUtils';

export class addNewOptionToCorporateBankQuestionnaire1695882343885 implements MigrationInterface {
  public name = addNewOptionToCorporateBankQuestionnaire1695882343885.name;

  public async up(queryRunner: QueryRunner): Promise<void> {
    const selectQuestionId = await queryRunner.query(`SELECT id FROM questionnaireQuestions WHERE questionKey='companyIndustrySector'`);

    const selectOptionsIdToChangeOrder = await queryRunner.query(
      `SELECT id FROM questionnaireOptions WHERE questionId=${selectQuestionId[0].id} AND orderPriority >= 15 ORDER BY orderPriority ASC`);

    const newValues: number[] = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];

    if (selectOptionsIdToChangeOrder.length !== newValues.length) {
      throw new Error(`There is a data issue. Expected ${ newValues.length } rows from questionnaireOptions, but got ${ selectOptionsIdToChangeOrder.length }.`);
    }

    let sqlQuery = 'UPDATE questionnaireOptions SET orderPriority = CASE ';

    for (let i = 0; i < selectOptionsIdToChangeOrder.length; i++) {
      const idVal = Number(selectOptionsIdToChangeOrder[i].id);
      const newOrderPriority = newValues[i];
      sqlQuery += `WHEN id = ${idVal} THEN ${newOrderPriority} `;
    }

    sqlQuery += 'ELSE orderPriority END;';

    await runSqlQueries([sqlQuery], queryRunner);

    const insertQuestionnaireOption =  `INSERT INTO questionnaireOptions (
        \`description\`, \`enabled\`, \`optionKey\`, \`orderPriority\`, \`published\`, \`questionId\`
    ) VALUES (
        'Holding Company', 1, 'holdingCompany', 15, 1, '${selectQuestionId[0]?.id}')
    `;
    await runSqlQueries([insertQuestionnaireOption], queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const selectQuestionId = await queryRunner.query(`SELECT id FROM questionnaireQuestions WHERE questionKey='companyIndustrySector'`);
    const selectOptionsIdToChangeOrder = await queryRunner.query(
      `SELECT id FROM questionnaireOptions WHERE questionId=${selectQuestionId[0].id} AND orderPriority >= 16 ORDER BY orderPriority ASC`);
    const newValues: number[] = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];

    if (selectOptionsIdToChangeOrder.length !== newValues.length) {
      throw new Error(`There is a data issue. Expected ${ newValues.length } rows from questionnaireOptions, but got ${ selectOptionsIdToChangeOrder.length }.`);
    }

    const deleteQuestionnaireOption = `DELETE FROM questionnaireOptions WHERE optionKey='holdingCompany' AND questionId=${selectQuestionId[0].id}`;
    await runSqlQueries([deleteQuestionnaireOption], queryRunner);

    let sqlQuery = 'UPDATE questionnaireOptions SET orderPriority = CASE ';

    for (let i = 0; i < selectOptionsIdToChangeOrder.length; i++) {
      const idVal = Number(selectOptionsIdToChangeOrder[i].id);
      const newOrderPriority = newValues[i];
      sqlQuery += `WHEN id = ${idVal} THEN ${newOrderPriority} `;
    }

    sqlQuery += 'ELSE orderPriority END;';

    await runSqlQueries([sqlQuery], queryRunner);
  }
}
