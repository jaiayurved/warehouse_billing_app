// App.js (Final Cleaned Version)
import React, { useState, useEffect } from "react";
import products from "./data/products";





// Components
import WelcomeScreen from "./components/WelcomeScreen";
import TopBar from "./components/TopBar";
import CategoryTabs from "./components/CategoryTabs";
import ProductGrid from "./components/ProductGrid";
import CartReview from "./components/CartReview";
import ReviewPanel from "./components/ReviewPanel";

import PreviewScreen from "./components/PreviewScreen";

import InvoiceCartReview from "./components/InvoiceCartReview";



// Hooks
import useToast from "./hooks/useToast";
import useCart from "./hooks/useCartLogic";
import useDealer from "./hooks/useDealerLogic";
import useProductFilter from "./hooks/useProductFilter";

// Utilities
import submitOrder from "./utils/submitOrder";

import "./styles/styles.css";

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [dealerCode, setDealerCode] = useState("");
  const [dealerPhone, setDealerPhone] = useState(null);
  const [dealerNameInput, setDealerNameInput] = useState("");
  const dealer = useDealer(dealerPhone);

  



  const [tab, setTab] = useState("categories");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("चूर्ण ");
  const [showRestorePrompt, setShowRestorePrompt] = useState(false);

  const { toast, showToast, ToastComponent } = useToast();
  const {
    cart,
    handleAdd,
    handleRemove,
    handleBatchChange,
    handleAddBatch,
    handleSubmit,
    resetCart,
    totalCTN,
    vehicleName,
    setVehicleName,
    vehicleNumber,
    setVehicleNumber,
    notes,
    setNotes
  } = useCart(showToast);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
  const storedCart = JSON.parse(localStorage.getItem("cart_v3") || "[]");
  if (storedCart.length > 0) {
    setShowRestorePrompt(true);
    showToast("🛒 Draft Order Detected");
  }
}, []);


  const filteredProducts = useProductFilter(products, tab, search, selectedCategory, cart);

  const handleWhatsappSend = () => {
    const valid = cart.every(item => item.entries.every(e => e.batch && (e.qty > 0 || e.ctn > 0)));
    if (!valid) return showToast("⚠️ Fill batch, qty or CTN");

    submitOrder({ cart, dealer, vehicleName, vehicleNumber, notes, totalCTN, showToast});
    resetCart();
    setTab("categories");
  };

  const proceedToFinalReview = () => {
    const valid = cart.every(item => item.entries.every(e => e.batch && (e.qty > 0 || e.ctn > 0)));
    if (!valid) return showToast("⚠️ Fill batch, qty or CTN");
    setTab("finalReview");
  };

  const handleDealerRegister = () => {
    if (dealerNameInput.trim()) {
      alert("✅ Registered! Please refresh to continue.");
    } else {
      alert("Please enter your name.");
    }
  };

  if (showWelcome) return <WelcomeScreen onFinish={() => setShowWelcome(false)} />;

  if (!dealerPhone) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold mb-4">🔑 Enter Dealer Login Code</h1>
        <input
          type="text"
          placeholder="Enter your code (e.g., JAI123)"
          value={dealerCode}
          onChange={(e) => setDealerCode(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-full max-w-xs"
        />
        <button
          onClick={() => setDealerPhone(dealerCode)}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded"
        >✅ Login</button>
      </div>
    );
  }

  if (!dealer && dealerPhone) {
    return (
      <div className="p-6 max-w-md mx-auto bg-white shadow rounded-xl mt-6">
        <h2 className="text-xl font-bold text-center mb-4">🔐 Register as Dealer</h2>
        <p className="text-sm text-gray-600 mb-2">Phone: {dealerPhone}</p>
        <input
          type="text"
          placeholder="Your Name / Firm Name"
          value={dealerNameInput}
          onChange={(e) => setDealerNameInput(e.target.value)}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={handleDealerRegister}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >✅ Register Me</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {tab !== "review" && tab !== "finalReview" && (
  <div className="print:hidden">
    <TopBar
      dealerName={dealer?.["Dealer Name"]}
      tab={tab}
      setTab={setTab}
      cartCount={cart.length}
    />
  </div>
)}

        {showRestorePrompt && (
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-900 p-4 rounded mb-6 text-center shadow">
            <p className="mb-2">🛒 You have an unfinished order. Continue or start fresh?</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => { setShowRestorePrompt(false); setTab("review"); showToast("✅ Welcome back!"); }}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                ✅ Continue
              </button>
              <button onClick={() => { resetCart(); setShowRestorePrompt(false); setTab("categories"); showToast("🧹 Order cleared. Starting fresh."); }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                🧹 Start Fresh
              </button>
            </div>
          </div>
        )}


	
        {tab === "categories" && (
          <>
            <CategoryTabs currentCategory={selectedCategory} onSelect={setSelectedCategory} />
<div className="sticky top-16 z-30 bg-white/80 backdrop-blur-sm shadow-sm py-3">
  
  
  <div className="px-4 mt-3">
    <input
      type="text"
      placeholder="🔍 Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm"
    />
  </div>
</div>
            <ProductGrid items={filteredProducts} cart={cart} onAdd={handleAdd} />
            <div className="text-center text-sm text-gray-400 mt-4 animate-pulse">⬇️ Scroll down for more products ⬇️</div>
          </>
        )}




        {tab === "favorites" && (
          <>
            <h2 className="text-lg font-semibold mb-4">⭐ Favorites</h2>
            <ProductGrid items={filteredProducts} cart={cart} onAdd={handleAdd} />
          </>
        )}




        {tab === "categories" && cart.length > 0 && (
          <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
            <button
              onClick={() => setTab("review")}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full shadow-xl"
            >🛒 View My Order ({cart.length})</button>
          </div>
        )}




        {tab === "review" && (
          cart.length === 0 ? (
            <div className="text-center text-gray-600 mt-12 space-y-4">
              <p>🛒 No items in your cart.</p>
              <button
                onClick={() => setTab("categories")}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                ➕ Add More Products
              </button>
            </div>
          ) : (
            <CartReview
  cart={cart}
  handleRemove={handleRemove}
  handleBatchChange={handleBatchChange}
  handleAddBatch={handleAddBatch}
  totalCTN={totalCTN}
  vehicleName={vehicleName}
  setVehicleName={setVehicleName}
  vehicleNumber={vehicleNumber}
  setVehicleNumber={setVehicleNumber}
  notes={notes}
  setNotes={setNotes}
  setTab={setTab}              // ✅ Add this
  showToast={showToast}        // ✅ Also needed if using toast
  dealerPhone={dealerPhone}
  // 🔥 Add this here
/>

          )
        )}
	


       {tab === "finalReview" && (
  <ReviewPanel
    cart={cart}
    vehicleName={vehicleName}
    vehicleNumber={vehicleNumber}
    notes={notes}
    onPrint={() => window.print()}
    onSendWhatsapp={handleWhatsappSend}
    onAddMore={() => setTab("categories")}
    dealerPhone={dealerPhone}
   
  />
)}

{tab === "generateInvoice" && (
  <InvoiceCartReview cart={cart} setTab={setTab} />
)}


        {toast && <ToastComponent />}
      </div>
    </div>
  );
}
