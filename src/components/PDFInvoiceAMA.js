// src/pages/GenerateInvoicePage.js
import React, { useEffect, useState } from "react";
import PrintPreviewOrder from "../components/PrintPreviewOrder";
import InvoiceCartReview from "../components/InvoiceCartReview";

export default function GenerateInvoicePage() {
  const [cart, setCart] = useState([]);
  const [buyer, setBuyer] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart_v3") || "[]");
    const storedBuyer = JSON.parse(localStorage.getItem("buyer_data") || "null");

    setCart(storedCart);
    setBuyer(storedBuyer);
  }, []);

  if (!buyer || cart.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">
        ⚠️ No invoice data found in localStorage.
      </div>
    );
  }

  return (
    <div className="p-6">
      {(buyer?.Type || "").toUpperCase() === "JAI" ? (
        <PrintPreviewOrder
          cart={cart}
          vehicleName={"Factory Vehicle"}
          vehicleNumber={"NA"}
          notes={"Auto-generated"}
        />
      ) : (
        <InvoiceCartReview cart={cart} buyer={buyer} />
      )}
    </div>
  );
}
