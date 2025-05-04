import React from "react";

export default function PreviewScreen({ cart, vehicleName, vehicleNumber, notes, onBack }) {
  const totalCTN = cart.reduce((sum, item) =>
    sum + item.entries.reduce((eSum, e) => eSum + (e.ctn || 0), 0), 0);


	
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-xl font-bold text-center border-b pb-2 mb-4">👁 </h2>

      {cart.map((item, i) => (
        <div key={i} className="border p-4 rounded-md bg-gray-100 mb-6 shadow-lg">
          <h3 className="text-xl font-bold text-green-800 mb-2">{item.name}</h3>
          <table className="w-full text-sm border">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="border px-2 py-1">Batch</th>
                <th className="border px-2 py-1">MFG</th>
                <th className="border px-2 py-1">EXP</th>
                <th className="border px-2 py-1">Qty</th>
                <th className="border px-2 py-1">CTN</th>
                <th className="border px-2 py-1">Total</th>
              </tr>
            </thead>
            <tbody>
              {item.entries.map((entry, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1 text-center">{entry.batch}</td>
                  <td className="border px-2 py-1 text-center">{entry.mfg}</td>
                  <td className="border px-2 py-1 text-center">{entry.exp}</td>
                <td className="border px-2 py-1 text-center">{entry.qty}</td>
                  <td className="border px-2 py-1 text-center">{entry.ctn}</td>
               
             <td className="border px-4 py-1 text-center font-bold text-xl text-green-800">
		  {(entry.qty || 0) * (entry.ctn || 0)} pc
		</td>
   		</tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <div className="bg-white rounded-xl shadow-sm border p-4 space-y-2 text-sm">
        <p><strong>🚛 Vehicle:</strong> {vehicleName}</p>
        <p><strong>🔢 Vehicle Number:</strong> {vehicleNumber}</p>
        <p><strong>📦 Total CTNs:</strong> {totalCTN}</p>
        {notes && <p><strong>📝 Notes:</strong> {notes}</p>}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 p-4 shadow z-50 text-center">
        <button
          onClick={onBack}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded text-base font-semibold"
        >
          🔙 Go Back to Edit
        </button>
      </div>
    </div>
  );
}
