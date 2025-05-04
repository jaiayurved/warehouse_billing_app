import * as XLSX from "xlsx";

export default function exportTallyExcel(cart, filename = "Stock_Journal", vehicleName = "", vehicleNumber = "", notes = "") {
  const wsData = [];

  // Header row exactly as required
  wsData.push([
    "Voucher Date",
    "Voucher Type Name",
    "Item Name",
    "Billed Quantity",
    "Item Rate",
    "Item Amount",
    "Change Mode",
    "Item Allocations - Batch/Lot No.",
    "Item Allocations - Mfg. Date",
    "Item Allocations - Expiry Date",
    "Item Allocations - Godown Name"
  ]);

  const today = new Date();
  const voucherDate = today.toLocaleDateString("en-GB"); // DD/MM/YYYY

  cart.forEach(item => {
    item.entries
      .filter(e => e.qty > 0 && e.ctn > 0 && e.batch)
      .forEach(entry => {
        const totalQty = entry.qty * entry.ctn;
        const rate = parseFloat(entry.rate) || 0;
        const amount = totalQty * rate;

        const mfg = entry.mfg || "";
        const exp = entry.exp || "";

        // Format MFG/EXP to MM-YYYY
        const formatMonthYear = str => {
          const match = str.match(/\d{2,4}-\d{2,4}/) || str.match(/\d{2}\/\d{4}/);
          return match ? match[0].replace("/", "-") : str;
        };

        wsData.push([
          voucherDate,
          "Stock Journal",
          item.name,
          totalQty,
          rate,
          amount.toFixed(2),
          "Use for Stock Journal",
          entry.batch,
          formatMonthYear(mfg),
          formatMonthYear(exp),
          "Main location"
        ]);
      });
  });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  XLSX.utils.book_append_sheet(wb, ws, "Stock Journal");

  XLSX.writeFile(wb, `${filename}.xlsx`);
}
