import React from "react";
import { motion } from "framer-motion";

function Orders({ confirmedOrders, removeOrder, points }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        Your Orders
      </h2>

      
      <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg shadow">
        <p className="font-semibold">Your Reward Points: {points}</p>
        <p className="text-sm">
          Earn points by adding items to cart and placing orders!
        </p>
      </div>

      {confirmedOrders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {confirmedOrders.map((order) => (
            <motion.div
              key={order.id}
              whileHover={{ scale: 1.03 }}
              className="rounded-xl shadow-md p-4 bg-white flex flex-col"
            >
              <h3 className="font-semibold line-clamp-2">{order.title}</h3>
              <p>Qty: {order.quantity}</p>
              <p>Payment: {order.paymentMethod}</p>
              <p className="font-bold text-blue-600">Total: ${order.total}</p>
              <p className="text-sm mt-2 text-gray-500">
                Estimated Delivery: {order.delivery}
              </p>

              <button
                className="mt-3 bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded-lg transition cursor-pointer"
                onClick={() => removeOrder(order.id)}
              >
                Remove
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;


