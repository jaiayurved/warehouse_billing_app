// ✅ InvoiceCartReview.js (Fix blank screen + fail-safe fallback)

import React, { useEffect, useState } from "react";
import exportInvoiceExcel from "../utils/exportInvoiceExcel";

export default function InvoiceCartReview({
  cart,
  vehicleName,
  vehicleNumber,
  notes,
  onSubmit,
  setTab,
  buyersList,
  buyer
}) {
  const departmentCode = buyer?.Firm || "JAI";

  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [invoiceData, setInvoiceData] = useState([]);
  const [customInvoiceNo, setCustomInvoiceNo] = useState("");
  const [buyerSearch, setBuyerSearch] = useState("");

  const buyerFirm = buyer?.Firm || "JAI";
  const invoiceNo = `2025-26/${customInvoiceNo || "Loading..."}`;

  useEffect(() => {
    const allEntries = cart.flatMap(item =>
      item.entries.filter(e => e.batch && e.qty > 0 && e.ctn > 0).map(entry => ({
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

  useEffect(() => {
    const fetchInvoiceNumber = async () => {
      try {
        const res = await fetch(`https://script.google.com/macros/s/AKfycbw5DxTAH1_S2RadDCaPTKSVD3VW1q27Rj3tj0A47ZJ8eFmz_dZKimkjTVQ7l6SxBL83/exec?key=DPRTMNT54$&type=nextinvoice&code=${buyerFirm}`);
        const num = await res.text();
        setCustomInvoiceNo(num);
      } catch (err) {
        console.error("Invoice fetch failed", err);
      }
    };

    fetchInvoiceNumber();
  }, [buyerFirm]);

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
    if (!selectedBuyer) return alert("\u0915\u0943\u092a\u092f\u093e Buyer \u091a\u0941\u0928\u0947\u0902\u0964");

    localStorage.setItem("buyer_data", JSON.stringify({
      ...selectedBuyer,
      invoiceNumber: invoiceNo
    }));

    window.open("/generate-invoice", "_blank");
  };

  const handleWhatsAppOnly = () => {
    if (!selectedBuyer) return alert("\u0915\u0943\u092a\u092f\u093e Buyer \u091a\u0941\u0928\u0947\u0902\u0964");
    exportInvoiceExcel(invoiceData, selectedBuyer, grandTotal);

    const msg = [
      `\ud83d\udcdc *Invoice from ${selectedBuyer.name}*`,
      `No: ${invoiceNo}`,
      ...invoiceData.map((item, i) => `${i + 1}. ${item.name} | Qty: ${item.qty} | Billed: ${item.billedQty} | \u20b9${item.rate}`),
      `\nTotal: \u20b9${grandTotal.toFixed(2)}`
    ].join("\n");

    window.open(`https://wa.me/919929988408?text=${encodeURIComponent(msg)}`, '_blank');
    onSubmit();
  };

  const handleAddMore = () => {
    setTab("categories");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!buyersList || buyersList.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        \u23f3 Loading buyers list...
      </div>
    );
  }

  const filteredBuyers = buyersList.filter(b => b.name.toLowerCase().includes(buyerSearch.toLowerCase()));

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-center border-b pb-2">\ud83d\udccb Buyer Selection</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="\ud83d\udd0d Search Buyer..."
          value={buyerSearch}
          onChange={(e) => setBuyerSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredBuyers.map((b, i) => (
          <button
            key={i}
            className={`p-3 rounded shadow border text-left ${selectedBuyer?.name === b.name ? 'bg-blue-100 border-blue-500' : 'bg-white hover:bg-gray-50'}`}
            onClick={() => setSelectedBuyer(b)}
          >
            <div className="font-semibold">{b.name}</div>
            <div className="text-sm text-gray-600">GSTIN: {b.gstin || 'N/A'} | Scheme: {b.scheme || '—'}</div>
          </button>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 shadow-md py-3 flex flex-wrap justify-center gap-4 print:hidden">
        <button disabled={!selectedBuyer} onClick={handleRedirectToPDF} className={`px-5 py-2 rounded-full text-white font-semibold ${selectedBuyer ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}>\ud83d\udda8\ufe0f Generate Invoice</button>
        <button disabled={!selectedBuyer} onClick={handleWhatsAppOnly} className={`px-5 py-2 rounded-full text-white font-semibold ${selectedBuyer ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'}`}>\ud83d\udce4 Send WhatsApp</button>
        <button onClick={handleAddMore} className="px-5 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold">➕ Add More</button>
      </div>
    </div>
  );
}
