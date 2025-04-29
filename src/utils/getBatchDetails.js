import products from "../data/products";

export default function getBatchDetails(itemName, batchCode) {
  const product = products.find(p => p.name === itemName);
  const entry = product?.batches?.find(b => b.batch === batchCode);
  return entry || null;
}
