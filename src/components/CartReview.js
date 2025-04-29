import React from 'react';
import getBatchDetails from "../utils/getBatchDetails";
import products from "../data/products";
import html2pdf from "html2pdf.js";


export default function CartReview({
  cart,
  handleRemove,
  handleBatchChange,
  handleAddBatch,
  totalCTN,
  vehicleName,
  setVehicleName,
  vehicleNumber,
  setVehicleNumber,
  notes,
  setNotes,
  setTab,
  showToast,
	dealerPhone
}) {
  const handleSubmit = () => {
    let firstMissingRef = null;
    const valid = cart.every((item, itemIndex) =>
      item.entries.every((entry, batchIndex) => {
        const isValid = entry.batch && entry.ctn > 0;
        if (!isValid && !firstMissingRef) {
          const id = `batch-${itemIndex}-${batchIndex}`;
          firstMissingRef = document.getElementById(id);
        }
        return isValid;
      })
    );

    if (!valid) {
      showToast("⚠️ Fill batch, qty or CTN");
      if (firstMissingRef) {
        firstMissingRef.scrollIntoView({ behavior: "smooth", block: "center" });
        firstMissingRef.classList.add("ring", "ring-red-400");
        setTimeout(() => {
          firstMissingRef.classList.remove("ring", "ring-red-400");
        }, 1500);
      }
      return;
    }

    generatePDF();
    setTab("finalReview");
  };

const generateInvoice = () => {
  setTab("generateInvoice");
};




  const generatePDF = () => {
    const element = document.getElementById("pdf-content");
    html2pdf()
      .from(element)
      .set({
        margin: 0.5,
        filename: `Invoice.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
      })
      .toPdf()
      .get('pdf')
      .then(pdf => {
        window.open(pdf.output('bloburl'), '_blank');
      });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 px-4 pb-40">
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">🛒 No items in cart.</p>
      ) : (
        cart.map((item, itemIndex) => (
          <div key={itemIndex} className="bg-white rounded-xl shadow-sm border border-blue-200 p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-extrabold text-gray-900">{item.name}</h3>
              <button
                onClick={() => handleRemove(itemIndex)}
                className="text-red-500 hover:text-red-700 text-sm"
              >🗑️ Remove All</button>
            </div>

            {item.entries.map((entry, batchIndex) => (
              <div key={batchIndex} className="flex flex-wrap gap-3 items-end mb-3 border p-2 rounded-md bg-gray-50">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Batch No.</label>
                  <input
                    id={`batch-${itemIndex}-${batchIndex}`}
                    list={`batches-${itemIndex}-${batchIndex}`}
                    value={entry.batch || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleBatchChange(itemIndex, batchIndex, 'batch', val);
                      const details = getBatchDetails(item.name, val);
                      if (details) {
                        handleBatchChange(itemIndex, batchIndex, 'mfg', details.mfg || "");
                        handleBatchChange(itemIndex, batchIndex, 'exp', details.exp || "");
                      }
                    }}
                    className="border px-3 py-1 rounded w-32"
                  />
                  <datalist id={`batches-${itemIndex}-${batchIndex}`}>
                    {(products.find(p => p.name === item.name)?.batches || []).map((b, i) => (
                      <option key={i} value={b.batch} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">Qty (pcs)</label>
                  <input
                    type="number"
                    value={entry.qty || ""}
                    onChange={(e) => handleBatchChange(itemIndex, batchIndex, 'qty', parseInt(e.target.value) || 0)}
                    min="0"
                    className={`border px-3 py-1 rounded w-24 ${entry.qty > 0 ? 'border-green-400' : 'border-gray-300'}`}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">CTN</label>
                  <input
                    type="number"
                    value={entry.ctn || ""}
                    onChange={(e) => handleBatchChange(itemIndex, batchIndex, 'ctn', parseInt(e.target.value) || 0)}
                    min="0"
                    className={`border px-3 py-1 rounded w-24 ${entry.ctn > 0 ? 'border-green-400' : 'border-gray-300'}`}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-2">MFG Date</label>
                  <input
                    type="text"
                    placeholder="MM-YYYY"
                    inputMode="numeric"
                    maxLength={7}
                    value={entry.mfg || ""}
                    onChange={(e) => {
                      let val = e.target.value.replace(/[^0-9\-]/g, '');
                      if (/^\d{6}$/.test(val)) {
                        val = `${val.slice(0, 2)}-${val.slice(2)}`;
                      }
                      handleBatchChange(itemIndex, batchIndex, 'mfg', val);
                    }}
                    className="border px-3 py-1 rounded w-28 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-2">EXP Date</label>
                  <input
                    type="text"
                    placeholder="MM-YYYY"
                    inputMode="numeric"
                    maxLength={7}
                    value={entry.exp || ""}
                    onChange={(e) => {
                      let val = e.target.value.replace(/[^0-9\-]/g, '');
                      if (/^\d{6}$/.test(val)) {
                        val = `${val.slice(0, 2)}-${val.slice(2)}`;
                      }
                      handleBatchChange(itemIndex, batchIndex, 'exp', val);
                    }}
                    className="border px-3 py-1 rounded w-28 text-sm"
                  />
                </div>

                {(entry.qty > 0 && entry.ctn > 0) && (
                  <div className="text-sm font-semibold text-green-700">
                    Total Qty: {entry.qty * entry.ctn} pcs
                  </div>
                )}

                <button
                  onClick={() => handleRemove(itemIndex, batchIndex)}
                  className="text-red-500 hover:text-red-700 text-xs ml-2"
                >❌ Remove</button>
              </div>
            ))}

            <button
              onClick={() => handleAddBatch(itemIndex)}
              className="text-blue-600 text-sm mt-2"
            >➕ Add Batch</button>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <div className="bg-gray-100 border rounded-xl p-4 shadow-sm space-y-3 mt-8">
          <div className="text-right font-bold text-lg text-blue-700">Total CTN: {totalCTN}</div>

          <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 p-4 shadow-md z-50 flex justify-center flex-wrap gap-4">
            <button
              onClick={() => setTab("categories")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-base font-semibold"
            >
              ➕ Add More
            </button>

            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-base font-semibold"
            >
              ➡️ आगे जाएं
            </button>

   {dealerPhone === "BILL001" && (
  <button
    onClick={generateInvoice}
    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg text-base transition-all duration-300"
  >
    📄 Generate Invoice
  </button>
)}

          </div>
        </div>
      )}
    </div>
  );
}
