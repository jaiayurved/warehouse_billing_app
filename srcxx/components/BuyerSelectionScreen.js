import React from "react";

export default function BuyerSelectionScreen({ buyersList, onBuyerSelect }) {
  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">📋 Select Buyer</h2>
      <ul className="space-y-2 max-h-[70vh] overflow-y-auto">
        {buyersList.map((buyer, i) => (
          <li
            key={i}
            className="p-3 bg-gray-100 rounded hover:bg-blue-100 cursor-pointer"
            onClick={() => onBuyerSelect(buyer)}
          >
            <div className="font-semibold">{buyer.name}</div>
            {buyer.gstin && (
              <div className="text-sm text-gray-600">GSTIN: {buyer.gstin}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
