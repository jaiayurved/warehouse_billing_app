import { useState, useEffect } from 'react';

const STORAGE_KEYS = {
  CART: "cart_v3"
};

export default function useCart(showToast) {
  const [cart, setCart] = useState([]);
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
  const saveInterval = setInterval(() => {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, 10000); // Save every 10 seconds

  return () => clearInterval(saveInterval);
   }, [cart]);


  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.CART) || "[]");
    setCart(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

const handleAdd = (item) => {
  const existing = cart.find(c => c.name === item.name);
  if (!existing) {
    const newItem = {
      name: item.name,
      entries: [{ batch: "", mfg: "", exp: "", qty: 0, ctn: 0 }]
    };
    setCart(prev => [...prev, newItem]);
  } else {
    showToast("⚠️ Item already added — use +Batch to add more");
  }
};

  const handleRemove = (itemIndex, batchIndex = null) => {
    const newCart = [...cart];
    if (batchIndex === null) {
      newCart.splice(itemIndex, 1);
    } else {
      newCart[itemIndex].entries.splice(batchIndex, 1);
      if (newCart[itemIndex].entries.length === 0) {
        newCart.splice(itemIndex, 1);
      }
    }
    setCart(newCart);
    showToast("❌ Removed");
  };

  const handleBatchChange = (itemIndex, batchIndex, field, value) => {
    const newCart = [...cart];
    newCart[itemIndex].entries[batchIndex][field] =
      ["qty", "ctn"].includes(field) ? parseInt(value) || 0 : value;
    setCart(newCart);
  };

  const handleAddBatch = (itemIndex) => {
    const newCart = [...cart];
    newCart[itemIndex].entries.push({ batch: "", mfg: "", exp: "", qty: 0, ctn: 0 });
    setCart(newCart);
  };

  const handleSubmit = () => {
    const valid = cart.every(item =>
      item.entries.every(e => e.batch && (e.qty > 0 || e.ctn > 0))
    );
    if (!valid) {
      showToast("⚠️ Please fill batch, qty or CTN for all entries");
      return;
    }
    console.log("🛒 Final Order:", cart);
    console.log("🚚 Vehicle Name:", vehicleName);
    console.log("🔢 Vehicle Number:", vehicleNumber);
    console.log("📝 Notes:", notes);
    showToast("✅ Order submitted (local only)");
  };

  const resetCart = () => {
    localStorage.removeItem(STORAGE_KEYS.CART);
    setCart([]);
    setVehicleName("");
    setVehicleNumber("");
    setNotes("");
  };

  const totalCTN = cart.reduce(
    (sum, item) =>
      sum + item.entries.reduce((eSum, e) => eSum + (e.ctn || 0), 0),
    0
  );

  return {
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
  };
}
