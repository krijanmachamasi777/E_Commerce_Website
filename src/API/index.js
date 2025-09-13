// Get multiple categories and merge into one product array
export const getAllProducts = async () => {
  const urls = [
    "https://dummyjson.com/products/category/mens-shirts",
    "https://dummyjson.com/products/category/mens-shoes",
    "https://dummyjson.com/products/category/womens-dresses",
    "https://dummyjson.com/products/category/womens-shoes",
    "https://dummyjson.com/products/category/womens-watches",
    "https://dummyjson.com/products/category/mens-watches",
    "https://dummyjson.com/products/category/womens-bags",
    "https://dummyjson.com/products/category/sunglasses",
    "https://dummyjson.com/products/category/fragrances",
    "https://dummyjson.com/products/category/skincare",
    "https://dummyjson.com/products/category/beauty",
    "https://dummyjson.com/products/category/womens-jewellery",
  ];

  const responses = await Promise.all(urls.map(url => fetch(url).then(r => r.json())));
  return responses.flatMap(r => r.products);
};

// Get products by category
export const getProductsByCategory = async (category) => {
  const res = await fetch(`https://dummyjson.com/products/category/${category}`);
  return await res.json();
};

/// LocalStorage key
const CART_KEY = "cartItems";

// Get cart for a user (from localStorage)
export const getCart = async (uid) => {
  const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  return { carts: [{ id: 1, userId: uid, products: cart }] }; // mimic API shape
};

// Get product details (still from API)
export const getProductById = async (id) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  return await res.json();
};

// Add or update cart (localStorage only)
export const addToCart = async (userId = 5, productId) => {
  // Load current cart
  let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  // Check if product exists
  const index = cart.findIndex((p) => p.id === productId);
  if (index >= 0) {
    cart[index].quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  // Save back to localStorage
  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  return { userId, products: cart }; // mimic API response
};
