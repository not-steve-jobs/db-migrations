export const getSelectQuestionnaireQuestionnairesQuery =
  `SELECT id FROM questionnaireQuestionnaires WHERE product ='partners' AND authority ='lca'`;

export const insertQuestionnaire =
  `INSERT INTO questionnaireQuestionnaires (
        \`authority\`, \`brand\`, \`country\`, \`enabled\`, \`platform\`, \`product\`, \`published\`,\`tag\`, \`title\`, \`version\`
    ) VALUES (
        'lca',  NULL, NULL, 1, NULL, 'partners', 1, NULL, 'LCA Partners Questionnaire', NULL
    )`;

export function getInsertQuestionnaireGroupQuery(groupKey : string, title : string) : string {
  return `INSERT INTO questionnaireGroups (
        \`descriptionKey\`, \`enabled\`, \`footerDescription\`, \`footerKey\`, \`groupKey\`, \`groupType\`, \`headerDescription\`,\`headerKey\`, \`imageKey\`,
        \`immediate\`, \`published\`, \`title\`
      ) VALUES (NULL, 1, NULL, NULL, '${groupKey}', 'normal', NULL, NULL,NULL, 1, 1, '${title}')`;
}

export const getSelectQuestionnaireGroupsByPersonalDetailsPartnersQuery =
  `SELECT id FROM questionnaireGroups WHERE groupKey = 'personalDetailsPartners'`;

export const getSelectQuestionnaireGroupsByTermsAndConditionsPartnersQuery =
  `SELECT id FROM questionnaireGroups WHERE groupKey = 'termsAndConditionsPartners'`;

export function insertQuestionnaireQuestionnaireGroupsOrder(groupId : string, questionnaireId : string, orderPriority : string) : string {
  return `INSERT INTO questionnaireQuestionnaireGroupsOrder (\`groupId\`, \`questionnaireId\`, \`orderPriority\`)
            VALUES (${groupId} , ${questionnaireId} , ${orderPriority});`;
}

export function deleteQuestionnaireQuestionnaireGroupsOrder(questionnaireId : string , groupId : string) : string {
  return `DELETE FROM questionnaireQuestionnaireGroupsOrder WHERE questionnaireId = ${questionnaireId} AND groupId = ${groupId}`;
}

export function deleteQuestionnaire(id: string) : string {
  return `DELETE FROM questionnaireQuestionnaires WHERE id = ${id}`;
}
