import React, { useState, useEffect } from 'react';
import exportInvoiceExcel from "../utils/exportInvoiceExcel";
import PDFInvoice from "./PDFInvoice";

export default function InvoiceCartReview({
  cart,
  vehicleName,
  vehicleNumber,
  notes,
  onSubmit,
  setTab,
  buyersList
}) {
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [invoiceData, setInvoiceData] = useState([]);
  const [customInvoiceNo, setCustomInvoiceNo] = useState("INV-001");

  const invoiceNo = `2025-26/${customInvoiceNo}`;

  useEffect(() => {
    const allEntries = cart.flatMap(item =>
      item.entries
        .filter(e => e.batch && e.qty > 0 && e.ctn > 0)
        .map(entry => ({
          name: item.name,
          batch: entry.batch,
          mfg: entry.mfg,
          exp: entry.exp,
          qty: entry.qty * entry.ctn,
          rate: entry.rate || 0,
          billedQty: entry.qty * entry.ctn,
          discount: 0,
        }))
    );
    setInvoiceData(allEntries);
  }, [cart]);

  useEffect(() => {
    if (selectedBuyer) {
      const updated = invoiceData.map(item => {
        let billedQty = item.qty;
        if (selectedBuyer.scheme === "3+1") {
          billedQty = Math.round(item.qty * 3 / 4);
        } else if (selectedBuyer.scheme === "5+1") {
          billedQty = Math.round(item.qty * 5 / 6);
        }
        return {
          ...item,
          billedQty,
          discount: selectedBuyer.dis1 || 0,
        };
      });
      setInvoiceData(updated);
    }
  }, [selectedBuyer]);

  const handleChange = (index, field, value) => {
    const newData = [...invoiceData];
    newData[index][field] = value;
    setInvoiceData(newData);
  };

  const handleSend = () => {
    if (!selectedBuyer) {
      alert("कृपया Buyer चुनें।");
      return;
    }

    exportInvoiceExcel(invoiceData, selectedBuyer, grandTotal);

    let msg = `🧾 *Invoice from ${selectedBuyer.name}*\nNo: ${invoiceNo}`;
    invoiceData.forEach((item, i) => {
      msg += `\n${i + 1}. ${item.name} | Qty: ${item.qty} | Billed: ${item.billedQty} | ₹${item.rate}`;
    });
    msg += `\n\nTotal: ₹${grandTotal.toFixed(2)}`;
    const url = `https://wa.me/919929988408?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');

    onSubmit();
  };

  const grandTotal = invoiceData.reduce((sum, item) => {
    const billed = parseFloat(item.billedQty) || 0;
    const rate = parseFloat(item.rate) || 0;
    const discount = parseFloat(item.discount) || 0;
    const gross = billed * rate;
    return sum + (gross - (gross * discount / 100));
  }, 0);

  const handleAddMore = () => {
    setTab("categories");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 pb-36">
      <div className="print:hidden sticky top-0 z-10 bg-white pb-2">
        <h2 className="text-2xl font-bold text-center border-b pb-4">🧾 Generate Invoice</h2>
        <label className="block mb-2 text-sm">Select Buyer</label>
        <select
          className="w-full border px-4 py-2 rounded"
          value={selectedBuyer?.name || ""}
          onChange={(e) => {
            const b = buyersList.find(b => b.name === e.target.value);
            setSelectedBuyer(b || null);
          }}
        >
          <option value="">-- Select Buyer --</option>
          {buyersList.map((b, i) => (
            <option key={i} value={b.name}>{b.name}</option>
          ))}
        </select>

        {/* Invoice Number Input */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">🧾 Invoice No</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customInvoiceNo}
              onChange={(e) => setCustomInvoiceNo(e.target.value)}
              className="border px-4 py-2 rounded w-60"
              placeholder="INV-001"
            />
            <span className="text-gray-600 font-semibold">-2025-26</span>
          </div>
        </div>

        {selectedBuyer && (
          <div className="bg-blue-50 p-4 mt-4 rounded shadow-sm space-y-1 text-sm">
            <p><strong>💼 Buyer:</strong> {selectedBuyer.name}</p>
            <p><strong>🏠 Address:</strong> {selectedBuyer.address}</p>
            <p><strong>🧾 GSTIN:</strong> {selectedBuyer.gstin}</p>
            <p><strong>📄 Invoice No:</strong> {invoiceNo}</p>
          </div>
        )}
      </div>

      <div className="overflow-x-auto print:hidden">
        <table className="min-w-full text-sm border">
          <thead className="bg-blue-50">
            <tr>
              <th className="border p-2">Item</th>
              <th className="border p-2">Batch</th>
              <th className="border p-2">MFG</th>
              <th className="border p-2">EXP</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Rate</th>
              <th className="border p-2">Billed Qty</th>
              <th className="border p-2">Disc %</th>
              <th className="border p-2">Total ₹</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.map((item, i) => {
              const lineTotal = (parseFloat(item.billedQty) * parseFloat(item.rate) * (1 - (parseFloat(item.discount) || 0) / 100)).toFixed(2);
              return (
                <tr key={i} className={item.discount > 0 ? 'bg-yellow-50' : ''}>
                  <td className="border p-2 font-bold">{item.name}</td>
                  <td className="border p-2">{item.batch}</td>
                  <td className="border p-2">{item.mfg}</td>
                  <td className="border p-2">{item.exp}</td>
                  <td className="border p-2 text-center font-bold">{item.qty}</td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => handleChange(i, 'rate', e.target.value)}
                      className="w-20 border rounded px-2 py-1 font-bold" />
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
                  <td className="border p-2 font-bold text-green-700 text-center">₹ {lineTotal}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="text-right font-bold text-xl mt-4 print:hidden">
        Grand Total: ₹ {grandTotal.toFixed(2)}
      </div>

      <div className="print:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-2 shadow-inner z-90 flex justify-center gap-4">
        <button
          type="button"
          disabled={!selectedBuyer}
          onClick={() => window.print()}
          className={`px-4 py-2 rounded-full text-base shadow-md ${selectedBuyer ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          🖨️ Print Invoice
        </button>

        <button
          id="send-whatsapp-btn" type="button" onClick={handleSend} disabled={!selectedBuyer} className={`px-5 py-2 rounded-full text-base shadow-md ${selectedBuyer ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          📤 WhatsAPP
        </button>

        <button
          type="button"
          onClick={handleAddMore}
          className="px-6 py-2 rounded-full text-base shadow-md bg-purple-500 hover:bg-purple-600 text-white"
        >
          ➕ Add More Items
        </button>
      </div>

      {selectedBuyer && (
        <PDFInvoice
  cart={invoiceData}
  buyer={{ ...selectedBuyer, invoiceNumber: invoiceNo }}
  grandTotal={grandTotal}
/>
 )}
    </div>
  );
}
