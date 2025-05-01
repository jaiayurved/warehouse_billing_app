// components/TopBar.js

import React from "react";

export default function TopBar({ dealerName, tab, setTab, cartCount }) {
  return (

    <div className="flex flex-col sm:flex-row justify-between items-center mb-.5 px-1 py-1 bg-white rounded-sm shadow-xl border border-blue-200">
      <div className="text-l font-bold text-blue-700">
        ASHISH MEDICAL AGENCIES 
	
      </div>
      <div className="flex gap-1 mt-1 sm:mt-1">
        
        <button
          className={`px-4 py-2 rounded-lg font-medium ${tab === "favorites" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setTab("favorites")}
        >
          Favorites {cartCount > 0 && `(${cartCount})`}
        </button>

      </div>
    </div>
  );
}
