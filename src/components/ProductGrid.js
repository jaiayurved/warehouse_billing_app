import React from "react";

export default function ProductGrid({ items, cart, onAdd, showToast, setTab }) {
  const grouped = {};

  items.forEach((item) => {
    const parts = (item.name || "").split(" ");
    const key = parts[0];
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  });

  const isInCart = (name) => cart.some((c) => c.name === name);

  return (
    <div className="relative pb-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Object.entries(grouped).map(([group, groupItems]) => (
          <div key={group} className="bg-white border rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-blue-800 mb-2 border-b pb-1">{group}</h2>
            <ul className="space-y-4">
              {groupItems.map((item, i) => (




<li
  key={i}
  className={`flex justify-between items-center px-2 py-1 rounded ${
    isInCart(item.name) ? "bg-gray-100 opacity-60 relative" : ""
  }`}
>
  <span className="font-medium text-gray-800 text-sm truncate w-2/3">
    {item.name}
  </span>

  {isInCart(item.name) ? (
    <span className="text-green-600 font-bold text-xl">✔️</span>
  ) : (
    <button
      onClick={() => {
        onAdd(item);
        showToast && showToast("✅ Added to cart");
      }}
      className="bg-green-600 hover:bg-green-700 text-white text-xs px-6 py-2 rounded-full shadow-sm transition-transform active:scale-100"
    >
      ➕ Add
    </button>
  )}
</li>











              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Sticky Review Button */}
      <div className="fixed bottom-0 left-5 w-full bg-white border-t border-gray-300 p-4 shadow-md z-50 flex justify-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-yellow-100 hover:bg-yellow-200 text-Blue-800 text-sm font-semibold px-4 py-2 rounded-full shadow mr-4"
        >
          ⭐ View Favorites
        </button>

        <button
          onClick={() => setTab("review")}
          disabled={cart.length === 0}
          className={`text-base font-semibold px-3 py-2 rounded-full shadow-md transition-all duration-200 ${
            cart.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-800 text-white"
          }`}
        >
          ➡️ आगे जाएं (Next)
        </button>
      </div>
    </div>
  );
}
