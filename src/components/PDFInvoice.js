import React from "react";

export default function PDFInvoice({ cart, buyer, grandTotal }) {
  const today = new Date().toLocaleDateString('en-GB');

  return (
    <div id="pdf-invoice" className="hidden print:block text-black text-[11px] p-6 max-w-4xl mx-auto">
      {/* Company Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Ashish Medical Agencies</h1>
        <p className="text-sm">4381, Last Crossing, Bagroo Walo Ka Rasta, Chandpole Bazar, Jaipur-302001</p>
        <p className="text-sm">GSTIN: 08AMBPM1559K1ZU</p>
	<p1 className="text-sm">Phone:              </p1>

        <h2 className="text-xl font-bold mt-4 underline">📋 GST Invoice (UCS)</h2>
      </div>

      {/* Buyer Details */}
      <div className="mb-4 text-l space-y-1">
        <p><strong>Buyer:</strong> {buyer.name}</p>
        <p><strong>🏠 Address:</strong> {buyer.address}</p>
        <p><strong>🧾 GSTIN:</strong> {buyer.gstin}</p>
        <p><strong>📅 Date:</strong> {today}</p>
      </div>

      {/* Invoice Table */}
      <table className="w-full border border-collapse mt-4 text-center">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-2 py-1">Item</th>
            <th className="border px-2 py-1">Batch</th>
            <th className="border px-2 py-1">MFG</th>
            <th className="border px-2 py-1">EXP</th>
            <th className="border px-2 py-1">Qty</th>
            <th className="border px-2 py-1">Rate</th>
            <th className="border px-2 py-1">Disc%</th>
            <th className="border px-2 py-1">Total ₹</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, idx) => {
            const billed = parseFloat(item.billedQty) || 0;
            const rate = parseFloat(item.rate) || 0;
            const discount = parseFloat(item.discount) || 0;
            const total = (billed * rate * (1 - discount / 100)).toFixed(2);

            return (
              <tr key={idx}>
                <td className="border px-2 py-1">{item.name}</td>
                <td className="border px-2 py-1">{item.batch}</td>
                <td className="border px-2 py-1">{item.mfg}</td>
                <td className="border px-2 py-1">{item.exp}</td>
                <td className="border px-2 py-1 font-bold">{item.qty}</td>
                <td className="border px-2 py-1">{item.rate}</td>
                <td className="border px-2 py-1">{item.discount}%</td>
                <td className="border px-2 py-1 font-semibold">{total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Grand Total */}
      <div className="text-right font-bold text-lg mt-4">
        Grand Total: ₹ {grandTotal.toFixed(2)}
      </div>

      {/* Footer Signature */}
      <div className="flex justify-between items-end mt-12 text-sm">
        <div className="text-left">
          <p>_______________________</p>
          <p>Authorized Signatory</p>
        </div>
        <div className="text-right">
          <p>_______________________</p>
          <p>Receiver's Stamp</p>
        </div>
      </div>
    </div>
  );
}
