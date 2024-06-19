export function getActivitiesInsertQueries(): string[] {
  return activities.map(activity => getInsertActivityQuery(activity));
}

export function getInsertActivityQuery(activity: ActivityRow): string {
  return `INSERT INTO activities (\`productName\`, \`key\`,
\`skip\`, \`order\`,
\`enabled\`
) VALUES ('${ activity.productName }', '${ activity.key }',
${ activity.skip }, ${ activity.order },
${ activity.enabled })`;
}

type ProductName = 'cfd' | 'fxProInvest' | 'bankPro' | 'investPro' | 'partners' | 'cfdBank' | 'corporateBank';
type ActivityKey = 'questionnaire' | 'legalChecks' | 'verifications' | 'tax';

interface ActivityRow {
  productName: ProductName;
  key: ActivityKey;
  skip: boolean;
  order: number;
  enabled: boolean;
}

const activities: ActivityRow[] = [
  { productName: 'fxProInvest', key: 'questionnaire', skip: false, order: 1, enabled: false },
  { productName: 'fxProInvest', key: 'legalChecks', skip: false, order: 10, enabled: false },
  { productName: 'fxProInvest', key: 'verifications', skip: false, order: 20, enabled: false },
  { productName: 'investPro', key: 'questionnaire', skip: false, order: 1, enabled: false },
  { productName: 'investPro', key: 'tax', skip: false, order: 10, enabled: false },
  { productName: 'bankPro', key: 'questionnaire', skip: false, order: 1, enabled: false },
  { productName: 'bankPro', key: 'legalChecks', skip: false, order: 10, enabled: false },
  { productName: 'bankPro', key: 'verifications', skip: false, order: 20, enabled: false },
  { productName: 'bankPro', key: 'tax', skip: false, order: 30, enabled: false },
];
