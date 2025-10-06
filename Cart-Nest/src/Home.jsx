import React, { useState } from "react";
import { FaCube } from "react-icons/fa";
import { motion } from "framer-motion";

function Home({ filteredProducts, addToCart }) {
  const [mood, setMood] = useState("all");

  const moods = ["all", "Summer", "Party", "Work"];

  const moodFiltered = filteredProducts.filter((product) => {
    if (mood === "all") return true;
    
    if (mood === "Summer") return product.id % 2 === 0;
    if (mood === "Party") return product.id % 2 !== 0;
    if (mood === "Work") return product.id % 3 === 0;
    return true;
  });

  return (
    <div>
      
      <div className="mb-6 flex gap-3 justify-center">
        {moods.map((m) => (
          <button
            key={m}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              mood === m ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setMood(m)}
          >
            {m}
          </button>
        ))}
      </div>

      
      <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {moodFiltered.length > 0 ? (
          moodFiltered.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.05 }}
              className="rounded-xl shadow-md p-4 bg-white flex flex-col relative overflow-hidden"
            >
              
              <FaCube className="absolute top-2 right-2 text-gray-400 text-xl" />

              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-60 w-full object-cover rounded-md mb-2"
              />
              <h3 className="font-semibold mt-2 text-xl line-clamp-2">
                {product.title.length > 20
                  ? product.title.substring(0, 20) + "..."
                  : product.title}
              </h3>
              <p className="font-bold mt-1 text-blue-600">${product.price}</p>

              <button
                className="mt-auto bg-blue-600 text-white px-4 py-3 rounded-lg w-full transition hover:bg-blue-700"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
