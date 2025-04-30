import React, { useState, useEffect } from 'react';
import buyersList from "../data/buyers";
import exportInvoiceExcel from "../utils/exportInvoiceExcel";
import PDFInvoice from "./PDFInvoice";

export default function InvoiceCartReview({ cart, vehicleName, vehicleNumber, notes, onSubmit, setTab }) {
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [invoiceData, setInvoiceData] = useState([]);

  // STEP 1: Flatten all batch entries
  useEffect(() => {
    const allEntries = cart.flatMap(item =>
      item.entries
        .filter(e => e.batch && e.qty > 0 && e.ctn > 0)
        .map(entry => ({
          name: item.name,
          batch: entry.batch,
          mfg: entry.mfg,
          exp: entry.exp,
          qty: (entry.qty || 0) * (entry.ctn || 0),
          rate: entry.rate || 0,
          billedQty: (entry.qty || 0) * (entry.ctn || 0),
          discount: 0,
        }))
    );
    setInvoiceData(allEntries);
  }, [cart]);

  // STEP 2: Apply buyer scheme and discount
  useEffect(() => {
    if (selectedBuyer) {
      const updated = invoiceData.map(item => {
        let billedQty = item.qty;
        if (selectedBuyer.scheme === "3+1") {
          billedQty = Math.round(item.qty * (3 / 4));
        } else if (selectedBuyer.scheme === "5+1") {
          billedQty = Math.round(item.qty * (5 / 6));
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
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Buyer Selection */}
      <div className="print:hidden">
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

        {selectedBuyer && (
          <div className="bg-blue-50 p-4 mt-4 rounded shadow-sm space-y-1 text-sm">
            <p><strong>💼 Buyer:</strong> {selectedBuyer.name}</p>
            <p><strong>🏠 Address:</strong> {selectedBuyer.address}</p>
            <p><strong>🧾 GSTIN:</strong> {selectedBuyer.gstin}</p>
          </div>
        )}
      </div>

      {/* Invoice Table */}
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
                    ₹ {lineTotal}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Grand Total */}
      <div className="text-right font-bold text-xl mt-4 print:hidden">
        Grand Total: ₹ {grandTotal.toFixed(2)}
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-4 left-1/4 flex justify-center gap-6 mt-8 flex-wrap print:hidden">
        <button
          onClick={() => window.print()}
          disabled={!selectedBuyer}
          className={`px-8 py-3 rounded-full text-lg shadow-md ${selectedBuyer ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          🖨️ Print Invoice
        </button>

        <button
          onClick={handleSend}
          disabled={!selectedBuyer}
          className={`px-8 py-3 rounded-full text-lg shadow-md ${selectedBuyer ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          📤 Send & Export
        </button>
      </div>

      {/* Print PDF View */}
      {selectedBuyer && (

        <PDFInvoice cart={invoiceData} buyer={selectedBuyer} grandTotal={grandTotal} />
      )}

      {/* ➕ Add More Items Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-1 transform -translate-x-1/2 z-50 print:hidden">
          <button
            onClick={handleAddMore}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg"
          >
            ➕ Add More Items
          </button>
        </div>
      )}
    </div>
  );
}
