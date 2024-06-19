export const questionnaireQuestionsValue = [{
  description: 'Your Name',
  fieldType: 'input',
  projectedQuestionKey: 'firstName',
  questionKey: 'firstNameCorporateBank',
  mandatory: 1,
},
{
  description: 'Your Surname',
  fieldType: 'input',
  projectedQuestionKey: 'lastName',
  questionKey: 'lastNameCorporateBank',
  mandatory: 1,
},
{
  description: 'Legal Entity Name',
  fieldType: 'input',
  projectedQuestionKey: null,
  questionKey: 'companyName',
  mandatory: 1,
},
{
  description: 'Country of Incorporation',
  fieldType: 'countryList',
  projectedQuestionKey: 'country',
  questionKey: 'countryCorporateBank',
  mandatory: 1,
},
{
  description: 'Industry',
  fieldType: 'select',
  projectedQuestionKey: null,
  questionKey: 'companyIndustrySector',
  mandatory: 1,
},
{
  description: 'Entity website',
  fieldType: 'input',
  projectedQuestionKey: null,
  questionKey: 'companyWebsite',
  mandatory: 0,
}];

export function getSelectQuestionQueries(): Array<string> {
  return questionnaireQuestionsValue.map(elem => `SELECT id, questionKey FROM questionnaireQuestions WHERE questionKey = '${elem.questionKey}'`);
}

export function getSelectQuestionnaireQuestionnairesQuery(): string {
  return `SELECT id FROM questionnaireQuestionnaires WHERE product ='corporateBank' AND authority ='cbb'`;
}

export function getSelectQuestionnaireGroupsQueries(): string {
  return `SELECT id FROM questionnaireGroups WHERE groupKey ='grpInitialCorporateBank'`;
}

export const questionnaireOptionsValue = [{
  description: 'Accountancy',
  optionKey: 'accountancy',
  orderPriority: 1,
},
{
  description: 'Admin / Secretarial',
  optionKey: 'adminSecretarial',
  orderPriority: 2,
},
{
  description: 'Agricultural',
  optionKey: 'agricultural',
  orderPriority: 3,
},
{
  description: 'Catering / Hospitality',
  optionKey: 'cateringHospitality',
  orderPriority: 4,
},
{
  description: 'Company Services',
  optionKey: 'companyServices',
  orderPriority: 5,
},
{
  description: 'Creative / Media',
  optionKey: 'creativeMedia',
  orderPriority: 6,
},
{
  description: 'Defence / Military',
  optionKey: 'defenceMilitary',
  orderPriority: 7,
},
{
  description: 'Education',
  optionKey: 'education',
  orderPriority: 8,
},
{
  description: 'Emergency Services',
  optionKey: 'emergencyServices',
  orderPriority: 9,
},
{
  description: 'Energy',
  optionKey: 'energy',
  orderPriority: 10,
},
{
  description: 'Engineering',
  optionKey: 'engineering',
  orderPriority: 11,
},
{
  description: 'Export / Import',
  optionKey: 'exportImport',
  orderPriority: 12,
},
{
  description: 'Financial Services',
  optionKey: 'financialServices',
  orderPriority: 13,
},
{
  description: 'Government / Public Sector',
  optionKey: 'governmentPublicSector',
  orderPriority: 14,
},
{
  description: 'Legal',
  optionKey: 'legal',
  orderPriority: 15,
},
{
  description: 'Leisure / Entertainment / Tourism',
  optionKey: 'leisureEntertainmentTourism',
  orderPriority: 16,
},
{
  description: 'Manufacturing',
  optionKey: 'manufacturing',
  orderPriority: 17,
},
{
  description: 'Marketing / PR / Advertising',
  optionKey: 'marketingPRAdvertising',
  orderPriority: 18,
},
{
  description: 'Non-Governmental Organisation',
  optionKey: 'nonGovernmentalOrganisation',
  orderPriority: 19,
},
{
  description: 'Not for Profit / Charity',
  optionKey: 'notProfitCharity',
  orderPriority: 20,
},
{
  description: 'Pharmaceuticals',
  optionKey: 'pharmaceuticals',
  orderPriority: 21,
},
{
  description: 'Precious Metals / Stones',
  optionKey: 'preciousMetalsStones',
  orderPriority: 22,
},
{
  description: 'Property / Construction / Trade',
  optionKey: 'propertyConstructionTrade',
  orderPriority: 23,
},
{
  description: 'Retail',
  optionKey: 'retail',
  orderPriority: 24,
},
{
  description: 'Social Care / Services / Health / Medicine',
  optionKey: 'socialCareServicesHealthMedicine',
  orderPriority: 25,
},
{
  description: 'Technology',
  optionKey: 'technology',
  orderPriority: 26,
},
{
  description: 'Telecommunications',
  optionKey: 'telecommunications',
  orderPriority: 27,
},
{
  description: 'Transport / Logistics',
  optionKey: 'transportLogistics',
  orderPriority: 28,
},
];

export function findCompanyIndustrySectorQuestion(
  questionnaireQuestionsResult: Array<{id: string; questionKey: string}>):
    {id: string; questionKey: string} | undefined {
  return questionnaireQuestionsResult.find(elem => elem?.questionKey === 'companyIndustrySector');
}

