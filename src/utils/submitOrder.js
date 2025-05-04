import exportToCSV from "./exportTallyExcel";

export default function submitOrder(cart, dealer) {
  // 1. Export Stock Journal Excel
  exportToCSV(cart);

  // 2. WhatsApp message
  const msg = [
    `🏷 *Dispatch Summary - ${dealer?.name || "Warehouse"}*`,
    `📦 Items: ${cart.length}`,
    ""
  ];

  cart.forEach((item, i) => {
    const entryLines = item.entries
      .filter(e => e.qty > 0 && e.ctn > 0 && e.batch)
      .map((entry, idx) => {
        const totalQty = entry.qty * entry.ctn;
        return `${i + 1}.${idx + 1} ${item.name} | Qty: ${totalQty} pcs | Batch: ${entry.batch} | MFG: ${entry.mfg || "-"} | EXP: ${entry.exp || "-"}`;
      });
    msg.push(...entryLines);
  });

  msg.push(`\n🗂 Dispatched by Factory`);
  msg.push(`Date: ${new Date().toLocaleDateString()}`);

  const phoneNumber = dealer?.phone || "919929988408";
  return { phoneNumber, msg: msg.join("\n") };
}
