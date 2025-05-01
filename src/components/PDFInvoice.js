import React, { useEffect } from "react";
import html2pdf from "html2pdf.js";

export default function PDFInvoice({ cart, buyer, grandTotal }) {
  const buyerName = buyer?.name || " ";
  const buyerAddress = buyer?.address || " ";
  const buyerGSTIN = buyer?.gstin || " ";

  return (
    <>
      <div id="pdf-invoice" className="hidden print:block text-xs p-4">
        <h2 className="text-center text-base font-bold mb-2 border-b pb-1">
          🧾 Invoice — {buyerName}
        </h2>

        {/* ✅ Seller Info */}
        <div className="mb-2 border-b pb-2">
          <p className="font-bold">🧾 Seller: JAI Ayurvedic Research</p>
          <p>🏢 Address: Vedic Aura, Jaipur, Rajasthan, India</p>
          <p>📇 GSTIN: 08AAAFJ3360R1Z2</p>
          <p>🏷️ Ayush License No: 478-D | GMP Certified</p>
        </div>

        {/* ✅ Buyer Info */}
        <div className="mb-2">
          <p><strong>🏠 Buyer Address:</strong> {buyerAddress}</p>
          <p><strong>🧾 Buyer GSTIN:</strong> {buyerGSTIN}</p>
          <p><strong>🗓 Date:</strong> {new Date().toLocaleDateString()}</p>
        </div>

        {/* ✅ Items Table */}
        <table className="w-full text-[10px] border border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-1 py-1">Item</th>
              <th className="border px-1 py-1">Batch</th>
              <th className="border px-1 py-1">MFG</th>
              <th className="border px-1 py-1">EXP</th>
              <th className="border px-1 py-1">Qty</th>
              <th className="border px-1 py-1">Rate</th>
              <th className="border px-1 py-1">Billed Qty</th>
              <th className="border px-1 py-1">Discount%</th>
              <th className="border px-1 py-1">Total ₹</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, i) => {
              const total = (item.billedQty * item.rate * (1 - item.discount / 100)).toFixed(2);
              return (
                <tr key={i}>
                  <td className="border px-1 py-1">{item.name}</td>
                  <td className="border px-1 py-1">{item.batch}</td>
                  <td className="border px-1 py-1">{item.mfg}</td>
                  <td className="border px-1 py-1">{item.exp}</td>
                  <td className="border px-1 py-1 text-center">{item.qty}</td>
                  <td className="border px-1 py-1 text-right">{item.rate}</td>
                  <td className="border px-1 py-1 text-center">{item.billedQty}</td>
                  <td className="border px-1 py-1 text-right">{item.discount}</td>
                  <td className="border px-1 py-1 text-right font-bold">₹ {total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="text-right font-bold text-sm mt-2">
          Grand Total: ₹ {grandTotal.toFixed(2)}
        </div>
      </div>

      {/* ✅ Save PDF Button */}
      <div className="print:hidden text-center mt-4">
        <button
  onClick={() => {
    const buyerSafe = buyerName.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "");
    const today = new Date().toLocaleDateString('en-GB').split('/').reverse().join('-'); // e.g., 2025-05-01
    const fileName = `Invoice_${buyerSafe}_${today}.pdf`;

    const element = document.getElementById("pdf-invoice");
    if (element) {
      // 🔓 Unhide temporarily
      element.classList.remove("hidden");
      
      // 📄 Generate PDF
      html2pdf()
        .set({
          margin: 0.2,
          filename: fileName,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        })
        .from(element)
        .save()
        .then(() => {
          // 🔒 Hide again
          element.classList.add("hidden");
        });
    }
  }}
  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
>
  💾 Save PDF
</button>
      </div>
    </>
  );
}
