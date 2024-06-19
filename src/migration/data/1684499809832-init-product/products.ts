export function getProductInsertQueries(): string[] {
  return products.map(product => getInsertProductQuery(product));
}

export function getInsertProductQuery(product: ProductRow): string {
  return `INSERT INTO products (\`name\`) VALUES ('${ product.name }')`;
}

export function getDeleteProductQuery(product: ProductRow): string {
  return `DELETE FROM products WHERE (\`name\` = '${ product.name }')`;
}

interface ProductRow {
  name: string;
}

const products: ProductRow[] = [
  { name: 'cfd' },
  { name: 'fxProInvest' },
  { name: 'bankPro' },
  { name: 'investPro' },
  { name: 'partners' },
  { name: 'cfdBank' },
];
