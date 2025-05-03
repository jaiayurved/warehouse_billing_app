import React from "react";
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
  const invoiceNumber = buyer?.invoiceNumber || "2025-26/___";

  return (
    <>
      <style>
        {`
          #pdf-invoice table tbody tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          #pdf-invoice th, #pdf-invoice td {
            border: 1px solid #ccc;
            padding: 6px;
            font-size: 12px;
          }
          #pdf-invoice th {
            background-color: #E0F2FE;
            color: #1E3A8A;
            text-transform: uppercase;
          }
        `}
      </style>

      <div id="pdf-invoice" className="block text-sm p-4 relative bg-white">
        <h2 className="text-center text-base font-bold mb-2 border-b pb-1">
          GST CREDIT INVOICE (UCS)
        </h2>

        {/* ✅ Seller Info */}
        <div className="mb-4">
          <p><strong>Seller:</strong> ASHISH MEDICAL AGENCIES 2025-26</p>
          <p><strong>Address:</strong> 4381, Last Crossing Bagro Walo Ka Rasta, Chandpole Bazar, Jaipur-302001, Rajasthan, India</p>
          <p><strong>GSTIN:</strong> 08AMBPM1559K1ZU</p>
        </div>

        {/* ✅ Buyer Info */}
        <div className="mb-4">
          <p><strong>Buyer:</strong> {buyerName}</p>
          <p><strong>Address:</strong> {buyerAddress}</p>
          <p><strong>GSTIN:</strong> {buyerGSTIN}</p>
          <p><strong>Invoice No:</strong> {invoiceNumber}</p>
          <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
        </div>

        {/* ✅ Invoice Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th>Item</th>
              <th>Batch</th>
              <th>MFG</th>
              <th>EXP</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Billed Qty</th>
              <th>Disc %</th>
              <th>Total ₹</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, i) => {
              const total = (item.billedQty * item.rate * (1 - (item.discount || 0) / 100)).toFixed(2);
              return (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.batch}</td>
                  <td>{item.mfg}</td>
                  <td>{item.exp}</td>
                  <td className="text-center">{item.qty}</td>
                  <td className="text-right">{item.rate}</td>
                  <td className="text-center">{item.billedQty}</td>
                  <td className="text-right">{item.discount}%</td>
                  <td className="text-right font-bold">₹ {total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="text-right font-bold text-base mt-4">
          Grand Total: ₹ {grandTotal.toFixed(2)}
        </div>

        <div className="text-right italic text-sm text-gray-700">
          {numberToWords(grandTotal)}
        </div>

        {/* ✅ Signature & Stamp */}
        <div className="flex justify-between items-start mt-10 text-xs">
          <div className="text-left">
            <p className="mb-6">Receiver's Signature</p>
            <div className="w-40 border-t border-gray-400"></div>
          </div>
          <div className="text-right">
            <p className="font-bold text-sm">For ASHISH MEDICAL AGENCIES</p>
            <img src="/stamp.png" alt="Stamp" className="w-16 h-16 mt-2 opacity-80" />
            <div className="mt-1 border-t border-gray-400 w-40 mx-auto"></div>
            <p className="text-center">Authorized Signatory</p>
          </div>
        </div>

        {/* ✅ Footer Always Visible */}
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
    </>
  );
}
