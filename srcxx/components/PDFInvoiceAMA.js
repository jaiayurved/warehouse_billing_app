import React from "react";

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

export default function PDFInvoiceAMA({ cart, buyer, grandTotal }) {
  const buyerName = buyer?.name || "";
  const buyerAddress = buyer?.address || "";
  const buyerGSTIN = buyer?.gstin || "";
  const invoiceNumber = buyer?.invoiceNumber || "2025-26/___";

  return (
    <div id="pdf-invoice" className="p-4 text-sm bg-white">
      <h2 className="text-center font-bold text-base mb-2 border-b pb-1">GST TAX INVOICE</h2>

      {/* Seller Info */}
      <div className="mb-4">
        <p><strong>Seller:</strong> AMA Enterprises</p>
        <p><strong>Address:</strong> [Enter your AMA firm address here]</p>
        <p><strong>GSTIN:</strong> [Enter your AMA GSTIN here]</p>
      </div>

      {/* Buyer Info */}
      <div className="mb-4">
        <p><strong>Buyer:</strong> {buyerName}</p>
        <p><strong>Address:</strong> {buyerAddress}</p>
        <p><strong>GSTIN:</strong> {buyerGSTIN}</p>
        <p><strong>Invoice No:</strong> {invoiceNumber}</p>
        <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
      </div>

      <table className="w-full border text-xs">
        <thead className="bg-blue-200">
          <tr>
            <th className="border px-1 py-1">Item</th>
            <th className="border px-1 py-1">Batch</th>
            <th className="border px-1 py-1">Qty</th>
            <th className="border px-1 py-1">Rate</th>
            <th className="border px-1 py-1">Disc%</th>
            <th className="border px-1 py-1">Taxable ₹</th>
            <th className="border px-1 py-1">GST%</th>
            <th className="border px-1 py-1">CGST ₹</th>
            <th className="border px-1 py-1">SGST ₹</th>
            <th className="border px-1 py-1">Total ₹</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, i) => {
            const billed = item.billedQty;
            const rate = item.rate;
            const disc = item.discount || 0;
            const gstPercent = item.gst || 12;
            const taxable = (billed * rate * (1 - disc / 100));
            const cgst = taxable * (gstPercent / 2) / 100;
            const sgst = cgst;
            const total = taxable + cgst + sgst;

            return (
              <tr key={i}>
                <td className="border px-1 py-1">{item.name}</td>
                <td className="border px-1 py-1">{item.batch}</td>
                <td className="border px-1 py-1 text-center">{billed}</td>
                <td className="border px-1 py-1 text-right">{rate}</td>
                <td className="border px-1 py-1 text-right">{disc}</td>
                <td className="border px-1 py-1 text-right">₹{taxable.toFixed(2)}</td>
                <td className="border px-1 py-1 text-center">{gstPercent}%</td>
                <td className="border px-1 py-1 text-right">₹{cgst.toFixed(2)}</td>
                <td className="border px-1 py-1 text-right">₹{sgst.toFixed(2)}</td>
                <td className="border px-1 py-1 text-right font-bold">₹{total.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="text-right font-bold mt-4">
        Grand Total: ₹ {grandTotal.toFixed(2)}
      </div>

      <div className="text-right italic text-xs mt-1">
        {numberToWords(grandTotal)}
      </div>

      <div className="flex justify-between mt-10 text-xs">
        <div>
          <p>Receiver's Signature</p>
          <div className="mt-6 border-t border-gray-400 w-40"></div>
        </div>
        <div className="text-right">
          <p className="font-semibold">For AMA Enterprises</p>
          <img src="/stamp.png" alt="Stamp" className="w-16 h-16 opacity-80 mt-1" />
          <div className="mt-1 border-t border-gray-400 w-40 mx-auto"></div>
          <p className="text-center">Authorized Signatory</p>
        </div>
      </div>
    </div>
  );
}
