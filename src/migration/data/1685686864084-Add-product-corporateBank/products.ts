export function getInsertProductQuery(product: ProductRow): string {
  return `INSERT INTO products (\`name\`) VALUES ('${ product.name }')`;
}

export function getDeleteProductQuery(product: ProductRow): string {
  return `DELETE FROM products WHERE (\`name\` = '${ product.name }')`;
}

interface ProductRow {
  name: string;
}
