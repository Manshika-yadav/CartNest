import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Cart({
  cart,
  removeFromCart,
  setSelectedOrder,
  quantities,
  paymentMethod,
  handleQtyChange,
  products,
}) {
  const [comboSuggestions, setComboSuggestions] = useState([]);
  const [discountMessage, setDiscountMessage] = useState("");

  // Calculate total
  const total = cart.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] || 1),
    0
  );

  // Update combo suggestions based on cart
  useEffect(() => {
    const suggestions = [];
    cart.forEach((item) => {
      // Dummy logic: suggest next 2 products by ID
      const related = products
        .filter((p) => p.id !== item.id)
        .slice(0, 2);
      suggestions.push(...related);
    });
    setComboSuggestions(suggestions);
  }, [cart, products]);

  // Dynamic discount banner
  useEffect(() => {
    if (total > 0 && total < 100) {
      setDiscountMessage("Add 1 more item to get 10% off your order!");
    } else {
      setDiscountMessage("");
    }
  }, [total]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Your Cart</h2>

      {discountMessage && (
        <div className="bg-yellow-200 text-yellow-900 px-4 py-2 mb-4 rounded-lg">
          {discountMessage}
        </div>
      )}

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cart.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              className="rounded-xl shadow-md p-4 bg-white flex flex-col relative"
            >
              {/* Hover preview: alternate image */}
              <div className="relative">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-60 w-full object-cover rounded-md mb-2"
                />
              </div>

              <h3 className="font-semibold line-clamp-2">{item.title}</h3>
              <p className="font-bold mt-1 text-blue-600">${item.price}</p>

              <div className="flex items-center gap-2 mt-2">
                <label>Qty:</label>
                <input
                  type="number"
                  min="1"
                  value={quantities[item.id] || 1}
                  onChange={(e) =>
                    handleQtyChange(item.id, Number(e.target.value))
                  }
                  className="w-16 px-2 py-1 rounded border focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  className="bg-blue-600 text-white px-4 py-1 rounded-lg w-1/2 hover:bg-blue-700 transition"
                  onClick={() => setSelectedOrder(item)}
                >
                  Order Now
                </button>
                <button
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded-lg w-1/2 transition"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Combo Suggestions */}
      {comboSuggestions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-3">You may also like:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {comboSuggestions.map((prod) => (
              <motion.div
                key={prod.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-2 rounded-lg shadow flex flex-col"
              >
                <img
                  src={prod.thumbnail}
                  alt={prod.title}
                  className="h-32 object-cover rounded-md mb-2"
                />
                <p className="text-sm font-semibold line-clamp-2">{prod.title}</p>
                <p className="text-blue-600 font-bold">${prod.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

