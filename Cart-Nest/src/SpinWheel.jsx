import React, { useState } from "react";
import { motion } from "framer-motion";

function SpinWheel({ close }) {
  const [prize, setPrize] = useState(null);

  const spin = () => {
    const prizes = [
      "5% Discount",
      "10% Discount",
      "Free Shipping",
      "Extra Reward Points",
    ];
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    setPrize(randomPrize);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={close}
      ></div>

      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg w-80 relative"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <h2 className="text-xl font-bold mb-4 text-blue-600">Spin & Win!</h2>

        {prize ? (
          <div className="text-center">
            <p className="text-lg font-semibold mb-4">You won:</p>
            <p className="text-2xl font-bold text-green-600">{prize}</p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={close}
            >
              Close
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-4">Try your luck and win a surprise offer!</p>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              onClick={spin}
            >
              Spin
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default SpinWheel;
