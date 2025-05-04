// src/utils/exportTallyExcel.js
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import products from "../data/products"; // to get rates

const exportTallyExcel = (cart) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB"); // e.g., 25/04/2025

  const findRate = (itemName) => {
    const p = products.find(p => p.name === itemName);
    return p?.rate || 1; // default rate = 1 if not found
  };

  const headers = [
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
  ];

  const dataRows = cart.flatMap(item =>
    item.entries.map(entry => {
      const qty = (entry.qty || 0) * (entry.ctn || 1);
      const rate = findRate(item.name);
      const amount = qty * rate;
      return [
        formattedDate,
        "Stock Journal",
        item.name,
        qty,
        rate,
        amount,
        "Use for Stock Journal",
        entry.batch,
        entry.mfg,
        entry.exp,
       "Main location"
      ];
    })
  );

  const worksheetData = [headers, ...dataRows];
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "TallyExport");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `Tally_StockJournal_${formattedDate.replace(/\//g, '-')}_${today.getHours()}-${today.getMinutes()}.xlsx`);
};

export default exportTallyExcel;
