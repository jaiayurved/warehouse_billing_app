import React from 'react';
import getBatchDetails from "../utils/getBatchDetails";

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
  const isBilling = dealerPhone === "BILL001";

  // 🆕 Modular batch details autofill
  const autoFillBatchDetails = (itemName, batchNo, itemIndex, batchIndex) => {
    const details = getBatchDetails(itemName, batchNo);
    if (details) {
      handleBatchChange(itemIndex, batchIndex, 'mfg', details.mfg || "");
      handleBatchChange(itemIndex, batchIndex, 'exp', details.exp || "");
      if (isBilling) {
        handleBatchChange(itemIndex, batchIndex, 'rate', details.Rate || 0);
      }
    }
  };

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

    setTab(isBilling ? "invoice" : "finalReview");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 px-4 pb-40">
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">🛒 कोई प्रोडक्ट नहीं जोड़ा गया है।</p>
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
              <div key={batchIndex} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 items-end mb-3 border p-3 rounded-md bg-gray-50">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Batch No.</label>
                  <input
                    id={`batch-${itemIndex}-${batchIndex}`}
                    list={`batches-${itemIndex}-${batchIndex}`}
                    value={entry.batch || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleBatchChange(itemIndex, batchIndex, 'batch', val);
                      autoFillBatchDetails(item.name, val, itemIndex, batchIndex);
                    }}
                    className="border px-3 py-1 rounded w-full"
                    tabIndex={1}
                    enterKeyHint="next"
                  />
                  <datalist id={`batches-${itemIndex}-${batchIndex}`}>
                    {(getBatchDetails.getBatchesForItem(item.name) || []).map((batch, i) => (
                      <option key={i} value={batch.batch} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-xs text-gray-800 mb-1">Qty (pcs)</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    enterKeyHint="next"
                    value={entry.qty || ""}
                    onChange={(e) => handleBatchChange(itemIndex, batchIndex, 'qty', parseInt(e.target.value) || 0)}
                    min="0"
                    className={`border px-2 py-1 rounded w-full ${entry.qty > 0 ? 'border-green-400' : 'border-gray-300'}`}
                    tabIndex={2}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">CTN</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    enterKeyHint="next"
                    value={entry.ctn || ""}
                    onChange={(e) => handleBatchChange(itemIndex, batchIndex, 'ctn', parseInt(e.target.value) || 0)}
                    min="0"
                    className={`border px-3 py-1 rounded w-full ${entry.ctn > 0 ? 'border-green-800' : 'border-gray-300'}`}
                    tabIndex={3}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">MFG Date</label>
                  <input
                    type="text"
                    placeholder="MM-YYYY"
                    maxLength={7}
                    inputMode="numeric"
                    enterKeyHint="next"
                    value={entry.mfg || ""}
                    onChange={(e) => {
                      let val = e.target.value.replace(/[^0-9\-]/g, '');
                      if (/^\d{6}$/.test(val)) {
                        val = `${val.slice(0, 2)}-${val.slice(2)}`;
                      }
                      handleBatchChange(itemIndex, batchIndex, 'mfg', val);
                    }}
                    className="border px-3 py-1 rounded w-full text-sm"
                    tabIndex={4}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">EXP Date</label>
                  <input
                    type="text"
                    placeholder="MM-YYYY"
                    maxLength={7}
                    inputMode="numeric"
                    enterKeyHint="next"
                    value={entry.exp || ""}
                    onChange={(e) => {
                      let val = e.target.value.replace(/[^0-9\-]/g, '');
                      if (/^\d{6}$/.test(val)) {
                        val = `${val.slice(0, 2)}-${val.slice(2)}`;
                      }
                      handleBatchChange(itemIndex, batchIndex, 'exp', val);
                    }}
                    className="border px-3 py-1 rounded w-full text-sm"
                    tabIndex={5}
                  />
                </div>

                {isBilling && (
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Rate ₹</label>
                    <input
                      type="number"
                      inputMode="numeric"
                      enterKeyHint="done"
                      value={entry.rate || ""}
                      onChange={(e) => handleBatchChange(itemIndex, batchIndex, 'rate', parseFloat(e.target.value) || 0)}
                      className="border px-3 py-1 rounded w-full"
                      tabIndex={6}
                    />
                  </div>
                )}

                {(entry.qty > 0 && entry.ctn > 0) && (
                  <div className="text-sm font-semibold text-green-700">
                    Total: {entry.qty * entry.ctn} pcs
                  </div>
                )}

                <button
                  onClick={() => handleRemove(itemIndex, batchIndex)}
                  className="text-red-500 hover:text-red-700 text-xs"
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
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 p-4 shadow-md z-50 flex justify-center flex-wrap gap-4 transition-all duration-300">
          <button
            onClick={() => setTab("categories")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-base font-semibold"
          >
            ➕ Add More
          </button>

          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-base font-semibold"
          >
            ➡️ आगे जाएं
          </button>
        </div>
      )}

      {cart.length === 0 && (
        <div className="text-center mt-10">
          <p className="text-gray-500 mb-4">🛒 No items in cart.</p>
          <button
            onClick={() => setTab("categories")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold"
          >
            ➕ Add Items
          </button>
        </div>
      )}
    </div>
  );
}
