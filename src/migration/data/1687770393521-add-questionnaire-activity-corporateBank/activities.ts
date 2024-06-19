export function getInsertActivityQuery(activity: ActivityRow): string {
  return `INSERT INTO activities (\`productName\`, \`key\`,
\`skip\`, \`order\`,
\`enabled\`
) VALUES ('${ activity.productName }', '${ activity.key }',
${ activity.skip }, ${ activity.order },
${ activity.enabled })`;
}

export function getDeleteActivityQuery(productName: ProductName, activityKey: ActivityKey): string {
  return `DELETE FROM activities WHERE (\`productName\` = '${ productName }') AND (\`key\` = '${ activityKey }')`;
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
