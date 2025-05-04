import * as XLSX from "xlsx";

export default function exportInvoiceExcel(cart, buyer, grandTotal) {
  const buyerType = (buyer?.type || "").toUpperCase();
  const wsData = [];

  // Header row based on buyer type
  if (buyerType === "JAI") {
    wsData.push([
      "Item", "Batch", "Qty", "Rate", "Discount%", "Taxable ₹", "GST%", "CGST ₹", "SGST ₹", "Total ₹"
    ]);
  } else {
    wsData.push([
      "Item", "Batch", "Qty", "Rate", "Discount%", "Total ₹"
    ]);
  }

  cart.forEach(item => {
    const billed = item.billedQty;
    const rate = item.rate;
    const disc = item.discount || 0;
    const gstPercent = item.gst || 12;
    const taxable = billed * rate * (1 - disc / 100);
    const cgst = buyerType === "JAI" ? taxable * gstPercent / 2 / 100 : 0;
    const sgst = cgst;
    const total = buyerType === "JAI" ? taxable + cgst + sgst : taxable;

    if (buyerType === "JAI") {
      wsData.push([
        item.name,
        item.batch,
        billed,
        rate,
        disc,
        taxable.toFixed(2),
        gstPercent,
        cgst.toFixed(2),
        sgst.toFixed(2),
        total.toFixed(2)
      ]);
    } else {
      wsData.push([
        item.name,
        item.batch,
        billed,
        rate,
        disc,
        total.toFixed(2)
      ]);
    }
  });

  // Footer
  wsData.push([]);
  wsData.push(["Buyer:", buyer.name]);
  wsData.push(["Address:", buyer.address || ""]);
  if (buyer.gstin) wsData.push(["GSTIN:", buyer.gstin]);
  wsData.push(["Invoice No:", buyer.invoiceNumber || ""]);

  wsData.push(["", "", "", "", "", "", "", "", "", "Grand Total ₹", grandTotal.toFixed(2)]);

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  XLSX.utils.book_append_sheet(wb, ws, "Invoice");

  const fileName = `Invoice_${buyer.name}_${buyer.invoiceNumber || "Bill"}.xlsx`;
  XLSX.writeFile(wb, fileName);
}
