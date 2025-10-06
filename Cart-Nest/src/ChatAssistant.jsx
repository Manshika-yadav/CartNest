import React, { useState } from "react";

function ChatAssistant({ products, addToCart }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! Looking for a gift or product?" },s
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    
    const suggestion =
      products[Math.floor(Math.random() * products.length)];
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: `I suggest "${suggestion.title}". Want to add it to cart?`,
        product: suggestion,
      },
    ]);
    setInput("");
  };

  const handleAddProduct = (product) => {
    addToCart(product);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="w-80 bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <h3 className="font-semibold">Shopping Assistant</h3>
            <button onClick={() => setOpen(false)}>X</button>
          </div>
          <div className="p-3 h-64 overflow-y-auto flex flex-col gap-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${
                  msg.sender === "bot"
                    ? "bg-gray-100 text-gray-800 self-start"
                    : "bg-blue-600 text-white self-end"
                } p-2 rounded-lg max-w-[80%]`}
              >
                <p>{msg.text}</p>
                {msg.product && (
                  <button
                    className="mt-1 bg-green-500 text-white px-2 py-1 rounded-lg text-sm hover:bg-green-600"
                    onClick={() => handleAddProduct(msg.product)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="flex p-2 border-t">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-2 py-1 rounded border focus:ring-2 focus:ring-blue-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="ml-2 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      )}
      {!open && (
        <button
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
          onClick={() => setOpen(true)}
        >
          💬
        </button>
      )}
    </div>
  );
}

export default ChatAssistant;
