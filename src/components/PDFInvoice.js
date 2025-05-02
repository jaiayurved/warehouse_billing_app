import React, { useEffect } from "react";
import html2pdf from "html2pdf.js";

export default function PDFInvoice({ cart, buyer, grandTotal }) {
  const buyerName = buyer?.name || " ";
  const buyerAddress = buyer?.address || " ";
  const buyerGSTIN = buyer?.gstin || " ";
  

  return (
    <>
      <div id="pdf-invoice" className="block text-xs p-4 relative">
        <div className="absolute top-6 right-6 text-[10px] font-semibold text-gray-600">
  Invoice No: {buyer?.invoiceNumber || "2025-26/___"}
</div>

        <h2 className="text-center text-base font-bold mb-2 border-b pb-1">
          GST CREDIT INVOICE (UCS)
        </h2>

        {/* ✅ Seller Info */}
        <div className="mb-2 border-b pb-2">
          <p className="font-bold">🧾 Seller: ASHISH MEDICAL AGENCIES 2025-26</p>
          <p>🏢 Address: 4381,Last Crossing Bagro Walo Ka Rasta, Chandpole Bazar, Jaipur-302001, Rajasthan, India</p>
          <p>📇 GSTIN:  08AMBPM1559K1ZU</p>
          <p>🏷️  | </p>
        </div>

        {/* ✅ Buyer Info */}
        <div className="mb-2">
          <h2><strong>   Buyer Name:</strong>  {buyerName}</h2>
	  <p><strong>🏠 Buyer Address:</strong> {buyerAddress}</p>
          <p><strong>   Buyer GSTIN:</strong> {buyerGSTIN}</p>
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
              <th className="border px-1 py-1">Qty (pcs)</th>
              <th className="border px-1 py-1">Rate</th>
              <th className="border px-1 py-1">Billed Qty</th>
              <th className="border px-1 py-1 w-12">Dis. %</th>
              <th className="border px-1 py-1">Total ₹</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, i) => {
              const total = (item.billedQty * item.rate * (1 - item.discount / 100)).toFixed(2);
              return (
                <tr key={i}>
                  <td className="border px-1 py-1 font-bold">{item.name}</td>
                  <td className="border px-1 py-1">{item.batch}</td>
                  <td className="border px-1 py-1">{item.mfg}</td>
                  <td className="border px-1 py-1">{item.exp}</td>
                  <td className="border px-1 py-1 text-center font-bold">{item.qty} pcs</td>
                  <td className="border px-1 py-1 text-right">{item.rate}</td>
                  <td className="border px-1 py-1 text-center">{item.billedQty}</td>
                  <td className="border px-1 py-1 text-right">{item.discount}%</td>
                  <td className="border px-1 py-1 text-right font-bold">₹ {total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="text-right font-bold text-sm mt-2">
          Grand Total: ₹ {grandTotal.toFixed(2)}
        </div>

        {/* ✅ Signature & Stamp */}
        <div className="flex justify-between items-end mt-8 text-[10px]">
          <div className="text-left">
            <p className="mb-6">Receiver's Signature</p>
            <div className="w-40 border-t border-gray-400"></div>
          </div>
          <div className="text-right">
            <p className="font-bold text-[11px]">For ASHISH MEDICAL AGENCIES</p>
            <img src="/stamp.png" alt="Stamp" className="w-16 h-16 mt-2 opacity-80" />
            <div className="mt-1 border-t border-gray-400 w-40 mx-auto"></div>
            <p className="text-center">Authorized Signatory</p>
          </div>
        </div>

        {/* ✅ Footer Always Visible for PDF */}
        <div className="mt-6 pt-3 border-t border-gray-300 text-center text-[10px] text-gray-700 leading-snug">
          <p className="font-bold text-[11px] tracking-wide">ASHISH MEDICAL AGENCIES 2025-26</p>
          <p>4380, Last Crossing Bagro Walo Ka Rasta</p>
          <p>Chandpole Bazar, Jaipur-302001</p>
          <p>📞 9829280873</p>
          <p>GSTIN: 08AMBPM1559K1ZU</p>
          <p className="italic mt-1">This is a computer-generated document and does not require signature.</p>
          <p className="mt-1">SUBJECT TO JAIPUR JURISDICTION</p>
        </div>
      </div>

      {/* ✅ Save PDF Button */}
      <div className="print:hidden text-center mt-4">
        <button
          onClick={() => {
            const buyerSafe = buyerName.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "");
            const today = new Date().toLocaleDateString('en-GB').split('/').reverse().join('-');
            const invoiceNumber = buyer?.invoiceNumber || "2025-26/___";
const fileName = `Invoice_${buyerSafe}_${today}_${invoiceNumber.replace(/\//g, '-')}.pdf`;

            const element = document.getElementById("pdf-invoice");
            if (element) {
              html2pdf()
                .set({
                  margin: 0.2,
                  filename: fileName,
                  image: { type: 'jpeg', quality: 0.98 },
                  html2canvas: { scale: 2 },
                  jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
                })
                .from(element)
                .save();
            }
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          📀 Save PDF
        </button>
      </div>
    </>
  );
}
