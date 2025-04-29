// InvoiceCartReview.js (Updated to use PDFInvoice.js Clean Printing)
import React, { useState, useEffect } from 'react';
import buyersList from "../data/buyers";
import exportInvoiceExcel from "../utils/exportInvoiceExcel";
import PDFInvoice from "./PDFInvoice";

export default function InvoiceCartReview({ cart, setTab, vehicleName, vehicleNumber, notes }) {
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [invoiceData, setInvoiceData] = useState([]);

  useEffect(() => {
    const initialInvoice = cart.map(item => ({
      name: item.name,
      batch: item.entries[0].batch || "",
      mfg: item.entries[0].mfg || "",
      exp: item.entries[0].exp || "",
      qty: (item.entries[0].qty || 0) * (item.entries[0].ctn || 1),
      rate: 0,
      billedQty: (item.entries[0].qty || 0) * (item.entries[0].ctn || 1),
      discount: 0,
    }));
    setInvoiceData(initialInvoice);
  }, [cart]);

  useEffect(() => {
    if (selectedBuyer) {
      const updatedInvoice = invoiceData.map(item => {
        let billedQty = item.qty;
        if (selectedBuyer.scheme === "3+1") {
          billedQty = Math.round(item.qty * (3/4));
        } else if (selectedBuyer.scheme === "5+1") {
          billedQty = Math.round(item.qty * (5/6));
        }
        return {
          ...item,
          billedQty,
          discount: selectedBuyer.dis1 || 0
        };
      });
      setInvoiceData(updatedInvoice);
    }
  }, [selectedBuyer]);

  const handleChange = (index, field, value) => {
    const newData = [...invoiceData];
    newData[index][field] = value;
    setInvoiceData(newData);
  };

  const handleSendWhatsapp = () => {
    if (!selectedBuyer) {
      alert("कृपया आगे बढ़ने से पहले Buyer चुनें।");
      return;
    }
    exportInvoiceExcel(invoiceData, selectedBuyer, grandTotal);

    const lines = invoiceData.map((item, index) => {
      const grossAmount = parseFloat(item.billedQty || 0) * parseFloat(item.rate || 0);
      const lineTotal = grossAmount * (1 - (parseFloat(item.discount || 0) / 100));
      return `${index + 1}. ${item.name} — ₹${lineTotal.toFixed(2)}`;
    });

    const message = `🧾 *Invoice for ${selectedBuyer.name}*\n\n${lines.join('\n')}\n\n*Grand Total: ₹${grandTotal.toFixed(2)}*`;

    const whatsappNumber = "919929988408";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  const grandTotal = invoiceData.reduce((sum, item) => {
    const billedQty = parseFloat(item.billedQty) || 0;
    const rate = parseFloat(item.rate) || 0;
    const discount = parseFloat(item.discount) || 0;
    const gross = billedQty * rate;
    return sum + (gross - (gross * discount / 100));
  }, 0);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Editable Section Hidden on Print */}
      <div className="print:hidden">
        <h2 className="text-2xl font-bold text-center border-b pb-4">🧾 Generate Invoice</h2>

        {/* Buyer Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Buyer</label>
          <select
            className="w-full border px-4 py-2 rounded shadow-sm"
            value={selectedBuyer ? selectedBuyer.name : ""}
            onChange={(e) => {
              const buyer = buyersList.find(b => b.name === e.target.value);
              setSelectedBuyer(buyer || null);
            }}
          >
            <option value="">-- Select Buyer --</option>
            {buyersList.map((buyer, i) => (
              <option key={i} value={buyer.name}>{buyer.name}</option>
            ))}
          </select>

          {selectedBuyer && (
            <div className="mt-4 p-4 bg-blue-50 rounded shadow">
              <p><strong>💼 Buyer:</strong> {selectedBuyer.name}</p>
              <p><strong>🏠 Address:</strong> {selectedBuyer.address}</p>
              <p><strong>🧾 GSTIN:</strong> {selectedBuyer.gstin}</p>
            </div>
          )}
        </div>

        {/* Editable Invoice Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-blue-50">
              <tr>
                <th className="border p-2">Item</th>
                <th className="border p-2">Batch</th>
                <th className="border p-2">MFG</th>
                <th className="border p-2">EXP</th>
                <th className="border p-2">Qty (PCS)</th>
                <th className="border p-2">Rate</th>
                <th className="border p-2">Billed Qty</th>
                <th className="border p-2">Discount %</th>
                <th className="border p-2">Total ₹</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.map((item, i) => (
                <tr key={i}>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.batch}</td>
                  <td className="border p-2">{item.mfg}</td>
                  <td className="border p-2">{item.exp}</td>
                  <td className="border p-2 text-center font-bold">{item.qty}</td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => handleChange(i, 'rate', e.target.value)}
                      className="w-20 border rounded px-2 py-1"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={item.billedQty}
                      onChange={(e) => handleChange(i, 'billedQty', e.target.value)}
                      className="w-20 border rounded px-2 py-1"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={item.discount}
                      onChange={(e) => handleChange(i, 'discount', e.target.value)}
                      className="w-20 border rounded px-2 py-1"
                    />
                  </td>
                  <td className="border p-2 font-bold text-green-700 text-center">
                    {(parseFloat(item.billedQty) * parseFloat(item.rate) * (1 - (parseFloat(item.discount || 0) / 100))).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Grand Total */}
        <div className="text-right font-bold text-xl mt-6">
          Grand Total: ₹ {grandTotal.toFixed(2)}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6 mt-8 flex-wrap">
          <button
            onClick={() => window.print()}
            disabled={!selectedBuyer}
            className={`px-8 py-3 rounded-full text-lg shadow-md ${selectedBuyer ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            🖨️ Print Invoice
          </button>

          <button
            onClick={handleSendWhatsapp}
            disabled={!selectedBuyer}
            className={`px-8 py-3 rounded-full text-lg shadow-md ${selectedBuyer ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            📤 Send via WhatsApp
          </button>

          <button
            onClick={() => setTab("categories")}
            className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-3 rounded-full text-lg shadow-md"
          >
            🔙 Back to Items
          </button>
        </div>
      </div>

      {/* Printable PDF Invoice Section */}
      {selectedBuyer && (
        <PDFInvoice cart={invoiceData} buyer={selectedBuyer} grandTotal={grandTotal} />
      )}
    </div>
  );
}
