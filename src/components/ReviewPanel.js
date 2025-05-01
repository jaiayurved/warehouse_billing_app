import React from "react";
import exportTallyExcel from "../utils/exportTallyExcel";

export default function ReviewPanel({
  cart,
  vehicleName,
  vehicleNumber,
  notes,
  onPrint,
  onSendWhatsapp, // retained for compatibility, not used here
  onAddMore
}) {
  const totalCTN = cart.reduce((sum, item) =>
    sum + item.entries.reduce((eSum, e) => eSum + (e.ctn || 0), 0), 0
  );

  const handleSendWhatsapp = () => {
    const phoneNumber = "919929988408"; // ✅ Fixed WhatsApp number
    const dealerName = "Factory";

    const timestamp = new Date().toLocaleString().replace(/[/,: ]+/g, "_");
    const filename = `${dealerName}_${timestamp}`;

    // 1. Export Excel
    exportTallyExcel(cart, filename, vehicleName, vehicleNumber, notes);

    // 2. Build WhatsApp message
    let msg = `🛒 *Factory to Office Dispatch Summary*\n👤 सरना से ऑफिस\n`;

    cart.forEach(item => {
      const totalQty = item.entries.reduce(
        (sum, e) => sum + ((e.qty || 0) * (e.ctn || 0)),
        0
      );

      msg += `\n\n🔹 *${item.name}* Total = *${totalQty}* pcs`;
      item.entries.forEach(e => {
        msg += `\n  Batch: ${e.batch || '-'}, *${e.qty || 0}* pc × ${e.ctn || 0} कार्टून`;
      });
    });

    msg += `\n\n🚛 वाहन: ${vehicleName || 'N/A'} (${vehicleNumber || 'N/A'})`;
    msg += `\n📦 कुल CTNs: ${totalCTN || 0}`;
    if (notes) msg += `\n📝 नोट्स: ${notes}`;

    const confirmSend = window.confirm("✅ Excel downloaded. Send WhatsApp now?");
    if (confirmSend) {
      const encoded = encodeURIComponent(msg);
      const url = `https://wa.me/${phoneNumber}?text=${encoded}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-4 print:text-sm">
      <h2 className="text-xl font-bold text-center border-b pb-2 print:hidden">📋 Order Review</h2>

      {/* Cart List */}
      <div className="print:hidden">
        {cart.map((item, i) => (
          <div key={i} className="border p-3 rounded-md bg-gray-50 mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th>Batch</th>
                  <th>Qty</th>
                  <th>CTN</th>
                  <th>Total Qty</th>
                </tr>
              </thead>
              <tbody>
                {item.entries.map((entry, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-1">{entry.batch}</td>
                    <td className="py-1">{entry.qty}</td>
                    <td className="py-1">{entry.ctn}</td>
                    <td className="py-1 font-bold text-green-700">
                      {(entry.qty || 0) * (entry.ctn || 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {/* Vehicle & Notes Summary */}
        <div className="mt-8 space-y-1">
          <p><strong>🚛 वाहन:</strong> {vehicleName}</p>
          <p><strong>🔢 वाहन नंबर:</strong> {vehicleNumber}</p>
          <p><strong>📦 कुल CTNs:</strong> {totalCTN}</p>
          {notes && <p><strong>📝 नोट्स:</strong> {notes}</p>}
          <p className="text-xs text-gray-400">🗓 दिनांक: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center flex-wrap gap-6 mt-8">
          <button
            onClick={onAddMore}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-5 py-2 rounded-lg shadow transition-transform transform hover:scale-105"
          >
            ➕ Add More
          </button>

          <button
            onClick={onPrint}
            className="bg-green-200 hover:bg-green-400 text-green-800 px-6 py-2 rounded-lg shadow transition-transform transform hover:scale-105"
          >
            🖨 Print
          </button>

          <button
            onClick={handleSendWhatsapp}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow font-semibold transition-transform transform hover:scale-105"
          >
            📲 WhatsApp भेजें
          </button>
        </div>
      </div>

      {/* Print Format */}
      <div className="hidden print:block mt-10">
        <h2 className="font-bold text-lg mb-4 text-center">🏭 Factory to Warehouse Order</h2>
        <table className="w-full text-[11px] border border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Product</th>
              <th className="border px-2 py-1">Batch</th>
              <th className="border px-2 py-1">MFG</th>
              <th className="border px-2 py-1">EXP</th>
              <th className="border px-2 py-1">Qty/CTN</th>
              <th className="border px-2 py-1">CTN</th>
              <th className="border px-2 py-1">Total Qty</th>
            </tr>
          </thead>
          <tbody>
            {cart.flatMap((item, itemIndex) =>
              item.entries.map((entry, batchIndex) => (
                <tr key={`${itemIndex}-${batchIndex}`}>
                  <td className="border px-2 py-1">{item.name}</td>
                  <td className="border px-2 py-1">{entry.batch}</td>
                  <td className="border px-2 py-1">{entry.mfg}</td>
                  <td className="border px-2 py-1">{entry.exp}</td>
                  <td className="border px-2 py-1 text-center">{entry.qty}</td>
                  <td className="border px-2 py-1 text-center">{entry.ctn}</td>
                  <td className="border px-2 py-1 text-center">
                    {(entry.qty || 0) * (entry.ctn || 0)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
