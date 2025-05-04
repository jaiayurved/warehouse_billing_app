import * as XLSX from "xlsx";

export default function exportInvoiceExcel(invoiceData, selectedBuyer, grandTotal) {
  if (!selectedBuyer) {
    alert("Please select a buyer first!");
    return;
  }

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB').replace(/\//g, "-");

  const exportData = invoiceData.map((item) => {
    const actualQty = parseFloat(item.qty) || 0;
    const billedQty = parseFloat(item.billedQty) || 0;
    const rate = parseFloat(item.rate) || 0;
    const discountPercent = parseFloat(item.discount) || 0;
    const grossAmount = billedQty * rate;
    const netAmount = grossAmount * (1 - discountPercent / 100);

    return {
      "Voucher Date": formattedDate,
      "Voucher Type Name": "Sales",
      "Voucher Number": "",  // You can generate auto if you want
      "Ledger Name": selectedBuyer.name,
      "Ledger Amount": "",  // Item rows will keep Ledger Amount blank
      "Item Name": item.name,
      "Actual Quantity": actualQty,
      "Billed Quantity": billedQty,
      "Item Rate": rate,
      "Item Rate per": "PCS",
      "Disc%": discountPercent,
      "Item Amount": netAmount.toFixed(2),
      "Change Mode": "Item Invoice",
      "Buyer/Supplier - Address": selectedBuyer.address || "",
      "Buyer/Supplier - Pincode": selectedBuyer.pincode || "",
    };
  });

  // 🆕 Add Ledger Row at end
  exportData.push({
    "Voucher Date": formattedDate,
    "Voucher Type Name": "Sales",
    "Voucher Number": "",
    "Ledger Name": selectedBuyer.name,
    "Ledger Amount": grandTotal.toFixed(2),
    "Item Name": "",
    "Actual Quantity": "",
    "Billed Quantity": "",
    "Item Rate": "",
    "Item Rate per": "",
    "Disc%": "",
    "Item Amount": "",
    "Change Mode": "",
    "Buyer/Supplier - Address": selectedBuyer.address || "",
    "Buyer/Supplier - Pincode": selectedBuyer.pincode || "",
  });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(exportData, { header: [
    "Voucher Date",
    "Voucher Type Name",
    "Voucher Number",
    "Ledger Name",
    "Ledger Amount",
    "Item Name",
    "Actual Quantity",
    "Billed Quantity",
    "Item Rate",
    "Item Rate per",
    "Disc%",
    "Item Amount",
    "Change Mode",
    "Buyer/Supplier - Address",
    "Buyer/Supplier - Pincode"
  ]});
  XLSX.utils.book_append_sheet(wb, ws, "Invoice");

  const fileName = `Invoice_${selectedBuyer.name}_${formattedDate}.xlsx`;
  XLSX.writeFile(wb, fileName);
}
