import React from "react";
import PDFInvoiceJAI from "./PDFInvoiceJAI";

export default function PrintPreviewOrder({ cart, vehicleName, vehicleNumber, notes }) {
  const buyer = JSON.parse(localStorage.getItem("buyer_data") || "{}");

  if (!buyer?.name) {
    return (
      <div className="p-6 text-center text-red-600">
        ⚠️ Buyer data not found.
      </div>
    );
  }

  const grandTotal = cart.reduce((sum, item) => {
    const billed = parseFloat(item.billedQty) || 0;
    const rate = parseFloat(item.rate) || 0;
    const discount = parseFloat(item.discount) || 0;
    const gross = billed * rate;
    return sum + (gross - (gross * discount / 100));
  }, 0);

  return (
    <div className="p-6 print:block">
      <PDFInvoiceJAI
        cart={cart}
        buyer={{
          ...buyer,
          invoiceNumber: buyer.invoiceNumber || "2025-26/___",
          vehicleName,
          vehicleNumber,
          notes
        }}
        grandTotal={grandTotal}
      />
    </div>
  );
}
