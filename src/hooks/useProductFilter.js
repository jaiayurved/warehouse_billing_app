// useProductFilter.js
// Role: Filter product list based on current tab, search, and category
// Used by App.js to return the correct product view

export default function useProductFilter(products, tab, search, selectedCategory, cart) {
  return products.filter((product) => {
    if (tab === "favorites") {
      return cart.some((item) => item.name === product.name);
    }
    if (search.trim()) {
      return product.name.toLowerCase().includes(search.toLowerCase());
    }
    return product.category === selectedCategory;
  });
}
