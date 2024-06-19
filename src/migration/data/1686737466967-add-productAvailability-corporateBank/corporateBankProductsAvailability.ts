const countries = [
  'AX', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT',
  'AZ', 'BH', 'BD', 'BB', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BQ', 'BV', 'BR', 'IO',
  'VG', 'BN', 'BG', 'BF', 'BI', 'CM', 'CA', 'CV', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX',
  'CC', 'MF', 'CO', 'KM', 'CK', 'CR', 'HR', 'CW', 'CY', 'CZ', 'DK', 'DJ', 'DM', 'DO',
  'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'SZ', 'FK', 'FO', 'FM', 'FJ', 'FI', 'FR', 'GF',
  'PF', 'TF', 'GA', 'GM', 'GE', 'DE', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG',
  'GN', 'GW', 'HT', 'HM', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IE', 'IM', 'IL', 'IT',
  'CI', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KW', 'KG', 'LV', 'LB', 'LS', 'LR', 'LI',
  'LT', 'LU', 'MO', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'YT', 'MX',
  'MD', 'MC', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'AN', 'NC', 'NZ',
  'NE', 'NG', 'NU', 'NF', 'MP', 'NO', 'OM', 'PW', 'PS', 'PG', 'PY', 'PE', 'PH', 'PN',
  'PL', 'PT', 'PR', 'QA', 'MK', 'RE', 'RO', 'RU', 'RW', 'BL', 'SH', 'KN', 'LC', 'PM',
  'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SB',
  'SO', 'ZA', 'GS', 'ES', 'SR', 'SJ', 'SE', 'CH', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG',
  'TK', 'TO', 'TR', 'TM', 'TC', 'TV', 'UA', 'AE', 'GB', 'US', 'UM', 'VI', 'UY', 'UZ',
  'VA', 'VN', 'WF', 'EH', 'ZM',
];

const corporateBankProductAvailability: ProductAvailabilityRow[] = countries.map(country => ({
  productName: 'corporateBank',
  countryIso2: country,
  authorityCode: 'cbb',
  status: 'active',
  isDefault: 1,
}));

export function getInsertProductsAvailabilityForCorporateBankQuery(): string[] {
  return corporateBankProductAvailability.map(
    productAvailability => getInsertProductAvailabilityQuery(productAvailability));
}

export function getInsertProductAvailabilityQuery(productAvailability: ProductAvailabilityRow): string {
  return `INSERT INTO productsAvailability (\`productName\`, \`countryIso2\`,
\`authorityCode\`, \`status\`,
\`isDefault\`)
VALUES ('${ productAvailability.productName }', '${ productAvailability.countryIso2 }',
'${ productAvailability.authorityCode }', '${ productAvailability.status }',
${ productAvailability.isDefault })`;
}

export function getDeleteProductsAvailabilityForCorporateBankQuery(productAvailability: Partial<ProductAvailabilityRow>): string {
  return `DELETE FROM productsAvailability WHERE (\`productName\` = '${ productAvailability.productName }')`;
}


interface ProductAvailabilityRow {
  productName: string;
  countryIso2: string;
  authorityCode: string;
  status: string;
  isDefault: number;
}

