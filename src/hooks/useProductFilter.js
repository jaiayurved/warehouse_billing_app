import { useState, useEffect } from "react";
import { setProductData } from "../utils/getBatchDetails";

export default function useProductFilter() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("पाक");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://script.google.com/macros/s/AKfycbyuBBpR3LjZftoWLmuJlABy4vex0CRSCweCq3MS8vh9klL7uTy1C3UO2Yfvx0eX6JE/exec?key=DPRTMNT54$&type=products");
        const data = await res.json();

        const grouped = {};

        data.forEach((row) => {
          const key = row.name?.trim();
          if (!key) return;

          if (!grouped[key]) {
            grouped[key] = {
              name: key,
              category: (row.Category || "Uncategorized").trim(),

              MRP: row.MRP || "",
              Rate: row.Rate || row.MRP || 0,
              batches: [],
            };
          }

          grouped[key].batches.push({
            batch: row.Batch || "",
            mfg: toMMYYYY(row.mfgDate),
            exp: toMMYYYY(row.expDate),
          });
        });

        const finalProducts = Object.values(grouped);
        setProducts(finalProducts);
        setFilteredProducts(finalProducts);
        setProductData(finalProducts); // ✅ Link to getBatchDetails.js

      } catch (err) {
        console.error("❌ Fetch error:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const result = products.filter((p) => {
      if (search.trim()) return p.name.toLowerCase().includes(search.toLowerCase());
      return p.category === selectedCategory;
    });
    setFilteredProducts(result);
  }, [products, search, selectedCategory]);

  return {
    products,
    filteredProducts,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory
  };
}

function toMMYYYY(isoDate) {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  if (isNaN(d)) return "";
  return `${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
}
