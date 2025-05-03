import React, { useEffect } from "react";
import html2pdf from "html2pdf.js";

function numberToWords(num) {
  const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const inWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : "");
    if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " and " + inWords(n % 100) : "");
    if (n < 100000) return inWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + inWords(n % 1000) : "");
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 !== 0 ? " " + inWords(n % 100000) : "");
    return inWords(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 !== 0 ? " " + inWords(n % 10000000) : "");
  };

  const rupees = Math.floor(num);
  const paise = Math.round((num - rupees) * 100);

  return `Rupees ${inWords(rupees)}${paise > 0 ? " and " + inWords(paise) + " Paise" : ""} Only`;
}

export default function PDFInvoice({ cart, buyer, grandTotal }) {
  const buyerName = buyer?.name || " ";
  const buyerAddress = buyer?.address || " ";
  const buyerGSTIN = buyer?.gstin || " ";

  return (
    <>
      <style>
        {`
          #pdf-invoice table tbody tr:nth-child(even) {
            background-color: #f9f9f9;
          }
        `}
      </style>
      <div id="pdf-invoice" className="block text-sm p-4 relative bg-white">
        <div className="absolute top-6 right-6 text-[10px] font-semibold text-gray-600">
          Invoice No: {buyer?.invoiceNumber || "2025-26/___"}
        </div>

        <h2 className="text-center text-base font-bold mb-2 border-b pb-1">
          GST CREDIT INVOICE (UCS)
        </h2>

        {/* ✅ Seller Info */}
        <div className="bg-gray-50 border rounded-md shadow-sm p-4 mb-4">
          <p className="font-extrabold">🧾 Seller: ASHISH MEDICAL AGENCIES 2025-26</p>
          <p>🏢 Address: 4381, Last Crossing Bagro Walo Ka Rasta, Chandpole Bazar, Jaipur-302001, Rajasthan, India</p>
          <p>📇 GSTIN: 08AMBPM1559K1ZU</p>
        </div>

        {/* ✅ Buyer Info */}
        <div className="bg-gray-100 border rounded-md shadow-sm p-4 mb-4">
          <p className="font-extrabold">Buyer Name: {buyerName}</p>
          <p>🏠 Address: {buyerAddress}</p>
          <p>📇 GSTIN: {buyerGSTIN}</p>
          <p>🗓 Date: {new Date().toLocaleDateString()}</p>
        </div>

        {/* ✅ Items Table */}
        <table className="w-full text-xs border border-collapse">
          <thead style={{ backgroundColor: '#E0F2FE', color: '#1E3A8A', textTransform: 'uppercase', fontSize: '12px' }}>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '6px' }}>Item Name</th>
              <th style={{ border: '1px solid #ccc', padding: '6px' }}>Batch No.</th>
              <th style={{ border: '1px solid #ccc', padding: '6px' }}>MFG</th>
              <th style={{ border: '1px solid #ccc', padding: '6px' }}>EXP</th>
              <th style={{ border: '1px solid #ccc', padding: '6px' }}>Qty</th>
              <th style={{ border: '1px solid #ccc', padding: '6px' }}>Rate</th>
              <th style={{ border: '1px solid #ccc', padding: '6px' }}>Billed Qty</th>
              <th style={{ border: '1px solid #ccc', padding: '6px' }}>Disc %</th>
              <th style={{ border: '1px solid #ccc', padding: '6px' }}>Total ₹</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, i) => {
              const billedQty = item.billedQty || 0;
              const rate = item.rate || 0;
              const discount = item.discount || 0;
              const total = (billedQty * rate * (1 - discount / 100)).toFixed(2);
              return (
                <tr key={i}>
                  <td className="border px-2 py-1 font-bold">{item.name}</td>
                  <td className="border px-2 py-1">{item.batch}</td>
                  <td className="border px-2 py-1">{item.mfg}</td>
                  <td className="border px-2 py-1">{item.exp}</td>
                  <td className="border px-2 py-1 text-center font-bold">{item.qty} pcs</td>
                  <td className="border px-2 py-1 text-right">{rate}</td>
                  <td className="border px-2 py-1 text-center">{billedQty}</td>
                  <td className="border px-2 py-1 text-right">{discount}%</td>
                  <td className="border px-2 py-1 text-right font-bold text-sm">₹ {total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="text-right font-bold text-base mt-2 border-t pt-2">
          Grand Total: ₹ {grandTotal.toFixed(2)}
        </div>
        <div className="text-right italic text-xs text-gray-700">{numberToWords(grandTotal)}</div>

        {/* ✅ Signature & Stamp */}
        <div className="flex justify-between items-end mt-8 text-xs">
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
          <p>4381, Last Crossing Bagro Walo Ka Rasta</p>
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
          📥 Save PDF
        </button>
      </div>
    </>
  );
}
