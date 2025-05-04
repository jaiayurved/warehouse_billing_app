import React, { useState, useEffect } from 'react';
import exportInvoiceExcel from "../utils/exportInvoiceExcel";

export default function InvoiceCartReview({
  cart,
  vehicleName,
  vehicleNumber,
  notes,
  onSubmit,
  setTab,
  buyersList,
  departmentCode = "JAI"
}) {
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [invoiceData, setInvoiceData] = useState([]);
  const [customInvoiceNo, setCustomInvoiceNo] = useState("");
  const [buyerSearch, setBuyerSearch] = useState("");

  const invoiceNo = `2025-26/${customInvoiceNo || "Loading..."}`;

  useEffect(() => {
    const allEntries = cart.flatMap(item =>
      item.entries.filter(e => e.batch && e.qty > 0).map(entry => ({
        name: item.name,
        batch: entry.batch,
        mfg: entry.mfg,
        exp: entry.exp,
        qty: entry.qty, // ✅ Actual Qty
        rate: entry.rate || 0,
        billedQty: entry.qty, // initial value, updated below
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

  useEffect(() => {
    const fetchInvoiceNumber = async () => {
      try {
        const res = await fetch(`https://script.google.com/macros/s/AKfycbw5DxTAH1_S2RadDCaPTKSVD3VW1q27Rj3tj0A47ZJ8eFmz_dZKimkjTVQ7l6SxBL83/exec?key=DPRTMNT54$&type=nextinvoice&code=${departmentCode}`, {
          method: "POST"
        });
        const num = await res.text();
        setCustomInvoiceNo(num);
      } catch (err) {
        console.error("Invoice fetch failed", err);
      }
    };

    fetchInvoiceNumber();
  }, [departmentCode]);

  useEffect(() => {
    if (selectedBuyer) {
      const payload = {
        buyer: { ...selectedBuyer, invoiceNumber: invoiceNo },
        cart: invoiceData,
        grandTotal
      };
      localStorage.setItem("invoicePayload", JSON.stringify(payload));
      localStorage.setItem("buyer_data", JSON.stringify({ ...selectedBuyer, invoiceNumber: invoiceNo }));
    }
  }, [selectedBuyer, invoiceData]);

  const handleChange = (index, field, value) => {
    const newData = [...invoiceData];
    newData[index][field] = value;
    setInvoiceData(newData);
  };

  const grandTotal = invoiceData.reduce((sum, item) => {
    const billed = parseFloat(item.billedQty) || 0;
    const rate = parseFloat(item.rate) || 0;
    const discount = parseFloat(item.discount) || 0;
    const gross = billed * rate;
    return sum + (gross - (gross * discount / 100));
  }, 0);

  const handleRedirectToPDF = () => {
    if (!selectedBuyer) return alert("कृपया Buyer चुनें।");
    window.open("/generate-invoice", "_blank");
  };

  const handleWhatsAppOnly = () => {
    if (!selectedBuyer) return alert("कृपया Buyer चुनें।");
    exportInvoiceExcel(invoiceData, selectedBuyer, grandTotal);

    const msg = [
      `🧾 *Invoice from ${selectedBuyer.name}*`,
      `No: ${invoiceNo}`,
      ...invoiceData.map((item, i) =>
        `${i + 1}. ${item.name} (${item.batch}) | Qty: ${item.qty} | Billed: ${item.billedQty} | ₹${item.rate}`
      ),
      `\nTotal: ₹${grandTotal.toFixed(2)}`
    ].join("\n");

    const whatsappNumber = selectedBuyer?.phone || "919929988408";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    onSubmit();
  };

  const handleAddMore = () => {
    setTab("categories");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredBuyers = buyersList.filter(b => b.name.toLowerCase().includes(buyerSearch.toLowerCase()));

  return (
    <div className="p-4 space-y-4">
      {/* ✅ Buyer Search */}
      <div className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="🔍 Search Buyer..."
          value={buyerSearch}
          onChange={(e) => setBuyerSearch(e.target.value)}
          className="w-full border px-3 py-2 rounded shadow-sm"
        />
        <ul className="border mt-2 max-h-40 overflow-y-auto rounded bg-white">
          {filteredBuyers.map((buyer, idx) => (
            <li
              key={idx}
              className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${selectedBuyer?.name === buyer.name ? 'bg-blue-200' : ''}`}
              onClick={() => setSelectedBuyer(buyer)}
            >
              {buyer.name} {buyer.gstin ? `(${buyer.gstin})` : ""}
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ Invoice Summary */}
      <div className="max-w-3xl mx-auto bg-white shadow p-4 border rounded">
        <h3 className="font-bold mb-2 text-blue-800">🧾 Invoice Preview</h3>
        <table className="w-full border text-sm">
          <thead className="bg-blue-100 text-left">
            <tr>
              <th className="border px-2 py-1">Item</th>
              <th className="border px-2 py-1">Batch</th>
              <th className="border px-2 py-1">Actual Qty</th>
              <th className="border px-2 py-1">Billed Qty</th>
              <th className="border px-2 py-1">Rate ₹</th>
              <th className="border px-2 py-1">Disc%</th>
              <th className="border px-2 py-1 text-right">Total ₹</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.map((item, idx) => {
              const total = item.billedQty * item.rate * (1 - item.discount / 100);
              return (
                <tr key={idx}>
                  <td className="border px-2 py-1">{item.name}</td>
                  <td className="border px-2 py-1">{item.batch}</td>
                  <td className="border px-2 py-1 text-center">{item.qty}</td>
                  <td className="border px-2 py-1 text-center">{item.billedQty}</td>
                  <td className="border px-2 py-1 text-right">{item.rate}</td>
                  <td className="border px-2 py-1 text-right">{item.discount}</td>
                  <td className="border px-2 py-1 text-right font-bold">₹{total.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="text-right font-bold mt-2">
          Grand Total: ₹ {grandTotal.toFixed(2)}
        </div>
      </div>

      {/* ✅ Sticky Buttons */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 shadow-md py-3 flex flex-wrap justify-center gap-4 print:hidden z-50">
        <button disabled={!selectedBuyer} onClick={handleRedirectToPDF} className={`px-5 py-2 rounded-full text-white font-semibold ${selectedBuyer ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}>🖨️ Generate Invoice</button>
        <button disabled={!selectedBuyer} onClick={handleWhatsAppOnly} className={`px-5 py-2 rounded-full text-white font-semibold ${selectedBuyer ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'}`}>📤 Send WhatsApp</button>
        <button onClick={handleAddMore} className="px-5 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold">➕ Add More</button>
      </div>
    </div>
  );
}
