// components/TopBar.js

import React from "react";

export default function TopBar({ dealerName, tab, setTab, cartCount }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 px-2 py-3 bg-white rounded-xl shadow-sm border border-blue-200">
      <div className="text-xl font-bold text-blue-700">
        VEDIC AURA {dealerName ? `| ${dealerName}` : ""}
      </div>
      <div className="flex gap-2 mt-2 sm:mt-0">
        <button
          className={`px-4 py-2 rounded-lg font-medium ${tab === "categories" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setTab("categories")}
        >
          Categories
        </button>
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
