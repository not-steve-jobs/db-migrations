export function getAuthoritiesInsertQueries(): string[] {
  return authorities.map(authority => getInsertAuthorityQuery(authority));
}

function getInsertAuthorityQuery(authority: AuthorityRow): string {
  return `INSERT INTO authorities (\`name\`, \`code\`) VALUES ('${ authority.name }', '${ authority.code }')`;
}

interface AuthorityRow {
  code: string;
  name: string;
}

const authorities: AuthorityRow[] = [
  { code: 'fca', name: 'FxPro UK Limited' },
  { code: 'cysec', name: 'FxPro Financial Services Ltd' },
  { code: 'gm', name: 'FxPro Global Markets Ltd' },
  { code: 'scb', name: 'BankPro Bahamas' },
  { code: 'cbb', name: 'Central Bank of Bahamas' },
  { code: 'cbc', name: 'Central Bank of Cyprus' },
  { code: 'fscm', name: 'Mauritius' },
  { code: 'knn' , name : 'FxPro Global Markets Ltd' },
];
