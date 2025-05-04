import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GenerateInvoicePage from "./pages/GenerateInvoicePage";

// Components
import WelcomeScreen from "./components/WelcomeScreen";
import TopBar from "./components/TopBar";
import CategoryTabs from "./components/CategoryTabs";
import ProductGrid from "./components/ProductGrid";
import CartReview from "./components/CartReview";
import ReviewPanel from "./components/ReviewPanel";
import InvoiceCartReview from "./components/InvoiceCartReview";

// Hooks
import useToast from "./hooks/useToast";
import useCart from "./hooks/useCartLogic";
import useDealer from "./hooks/useDealerLogic";
import useProductFilter from "./hooks/useProductFilter";

// Utilities
import submitOrder from "./utils/submitOrder";
import "./styles/styles.css";

export default function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/generate-invoice" element={<GenerateInvoicePage />} />
      </Routes>
    </Router>
  );
}

function MainApp() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [dealerCode, setDealerCode] = useState("");
  const [dealerPhone, setDealerPhone] = useState(null);
  const dealer = useDealer(dealerPhone);
  const isBilling = dealerPhone === "BILL001";

  const [buyersList, setBuyersList] = useState([]);
  const [tab, setTab] = useState("categories");
  const [showRestorePrompt, setShowRestorePrompt] = useState(false);

  const { toast, showToast } = useToast();
  const {
    cart,
    handleAdd,
    handleRemove,
    handleBatchChange,
    handleAddBatch,
    resetCart,
    totalCTN,
    vehicleName,
    setVehicleName,
    vehicleNumber,
    setVehicleNumber,
    notes,
    setNotes
  } = useCart(showToast);

  const {
    products,
    filteredProducts = [],
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory
  } = useProductFilter();

  // Load once
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart_v3") || "[]");
    if (storedCart.length > 0) setShowRestorePrompt(true);
  }, []);

  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbw5DxTAH1_S2RadDCaPTKSVD3VW1q27Rj3tj0A47ZJ8eFmz_dZKimkjTVQ7l6SxBL83/exec?key=DPRTMNT54$&type=buyers")
      .then(res => res.json())
      .then(data => setBuyersList(data))
      .catch(err => console.error("❌ Failed to load buyers", err));
  }, []);

  const handleInvoiceSubmit = () => {
    showToast("✅ Invoice exported and cart cleared");
    resetCart();
    setTab("categories");
  };

  const handleFinalOrderSubmit = async () => {
    const success = await submitOrder({
      cart,
      dealer,
      vehicleName,
      vehicleNumber,
      notes,
      totalCTN,
      showToast
    });
    if (success) {
      resetCart();
      setTab("categories");
      showToast("✅ Order submitted successfully");
    } else {
      showToast("⚠️ Failed to submit order");
    }
  };

  if (showWelcome) return <WelcomeScreen onFinish={() => setShowWelcome(false)} />;

  if (!dealerPhone) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold mb-4">🔑 Enter Dealer Login Code</h1>
        <input
          type="text"
          placeholder="Enter your code (e.g., 1234 or BILL001)"
          value={dealerCode}
          onChange={(e) => setDealerCode(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-full max-w-xs"
        />
        <button
          onClick={() => setDealerPhone(dealerCode.trim())}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded"
        >
          ✅ Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <TopBar dealerName={dealer?.["Dealer Name"]} />

        {showRestorePrompt && (
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-900 p-4 rounded mb-6 text-center shadow">
            <p className="mb-2">🛒 You have an unfinished order. Continue or start fresh?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowRestorePrompt(false);
                  setTab("review");
                  showToast("✅ Welcome back!");
                }}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                ✅ Continue
              </button>
              <button
                onClick={() => {
                  resetCart();
                  setShowRestorePrompt(false);
                  setTab("categories");
                  showToast("🧹 Order cleared. Starting fresh.");
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                🧹 Start Fresh
              </button>
            </div>
          </div>
        )}

        {/* Category Tab View */}
        {tab === "categories" && (
          <>
            <CategoryTabs currentCategory={selectedCategory} onSelect={setSelectedCategory} />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 mb-4">
              <input
                type="text"
                placeholder="🔍 Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <ProductGrid
              items={filteredProducts}
              cart={cart}
              onAdd={handleAdd}
              showToast={showToast}
              setTab={setTab}
            />
          </>
        )}

        {/* Cart Review */}
        {tab === "review" && (
          <CartReview
            cart={cart}
            handleRemove={handleRemove}
            handleBatchChange={handleBatchChange}
            handleAddBatch={handleAddBatch}
            handleSubmit={() => setTab(isBilling ? "invoice" : "finalReview")}
            totalCTN={totalCTN}
            vehicleName={vehicleName}
            setVehicleName={setVehicleName}
            vehicleNumber={vehicleNumber}
            setVehicleNumber={setVehicleNumber}
            notes={notes}
            setNotes={setNotes}
            setTab={setTab}
            showToast={showToast}
            dealerPhone={dealerPhone}
          />
        )}

        {/* Final Review for JAI / Others */}
        {tab === "finalReview" && (
          <ReviewPanel
            cart={cart}
            vehicleName={vehicleName}
            vehicleNumber={vehicleNumber}
            notes={notes}
            onPrint={() => {
              const dummyBuyer = {
                name: "Factory Transfer",
                gstin: "",
                Type: "JAI",
                invoiceNumber: "2025-26/FT"
              };

              const payload = {
                buyer: dummyBuyer,
                cart: cart,
                grandTotal: cart.reduce((sum, item) => {
                  const billed = parseFloat(item.billedQty) || 0;
                  const rate = parseFloat(item.rate) || 0;
                  const discount = parseFloat(item.discount) || 0;
                  const gross = billed * rate;
                  return sum + (gross - (gross * discount / 100));
                }, 0)
              };

              localStorage.setItem("invoicePayload", JSON.stringify(payload));
              window.open("/generate-invoice", "_blank");
            }}
            onSendWhatsapp={handleFinalOrderSubmit}
            onAddMore={() => setTab("categories")}
            dealerPhone={dealerPhone}
          />
        )}

        {/* Billing Department Invoice */}
        {tab === "invoice" && (
          <InvoiceCartReview
            cart={cart}
            vehicleName={vehicleName}
            vehicleNumber={vehicleNumber}
            notes={notes}
            buyersList={buyersList}
            onSubmit={handleInvoiceSubmit}
            setTab={setTab}
          />
        )}

        {/* Toast message */}
        {toast && (
          <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-xl text-sm">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
