// utils/getBatchDetails.js

let productData = [];

export function setProductData(data) {
  productData = data || [];
}

export default function getBatchDetails(itemName, batchNo) {
  const item = productData.find(
    (p) => p.name === itemName && p.batches?.some((b) => b.batch === batchNo)
  );

  const batchDetails = item?.batches?.find((b) => b.batch === batchNo);

  if (!item || !batchDetails) return null;

  return {
    mfg: batchDetails.mfg,
    exp: batchDetails.exp,
    Rate: item.Rate || 0,
    MRP: item.MRP || 0
  };
}

export function getBatchesForItem(itemName) {
  const item = productData.find((p) => p.name === itemName);
  return item?.batches || [];
}

getBatchDetails.getBatchesForItem = getBatchesForItem; // ✅ Backward compatibility
