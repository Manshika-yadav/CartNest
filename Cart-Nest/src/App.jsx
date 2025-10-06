import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Home.jsx";
import Cart from "./Cart.jsx";
import Orders from "./Orders.jsx";
import SpinWheel from "./SpinWheel.jsx";
import ChatAssistant from "./ChatAssistant.jsx";

function Layout({
  children,
  cart,
  setView,
  search,
  setSearch,
  view,
  isOpen,
  setIsOpen,
  theme
}) {
  return (
    <div className={`flex flex-col min-h-screen transition-colors ${theme.bg} ${theme.text}`}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <nav className="bg-gradient-to-r from-gray-200 to-gray-300 shadow-md sticky top-0 z-10 p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">CartNest</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setView("home")}
            className="bg-gray-100 px-3 py-2 rounded-lg shadow hover:bg-gray-200"
          >
            Home
          </button>
          <button
            onClick={() => setView("cart")}
            className="bg-gray-100 px-3 py-2 rounded-lg shadow hover:bg-gray-200"
          >
            Cart ({cart.length})
          </button>
          <button
            onClick={() => setView("orders")}
            className="bg-gray-100 px-3 py-2 rounded-lg shadow hover:bg-gray-200"
          >
            Orders
          </button>
        </div>
      </nav>

      <main className="flex-1 p-6">{children}</main>

      <footer className="bg-gray-200 text-gray-700 text-center py-4 mt-auto">
        <p className="text-sm">© {new Date().getFullYear()} CartNest. All rights reserved.</p>
      </footer>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("home");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState({});
  const [quantities, setQuantities] = useState({});
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState({ bg: "bg-white", text: "text-gray-900" });
  const [points, setPoints] = useState(0);
  const [spinOpen, setSpinOpen] = useState(false);

  
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
    setConfirmedOrders(JSON.parse(localStorage.getItem("confirmedOrders")) || []);
    setQuantities(JSON.parse(localStorage.getItem("quantities")) || {});
    setPaymentMethod(JSON.parse(localStorage.getItem("paymentMethod")) || {});
    setPoints(JSON.parse(localStorage.getItem("points")) || 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("quantities", JSON.stringify(quantities));
    localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
    localStorage.setItem("confirmedOrders", JSON.stringify(confirmedOrders));
    localStorage.setItem("points", JSON.stringify(points));
  }, [cart, quantities, paymentMethod, confirmedOrders, points]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product) => {
    if (cart.find((item) => item.id === product.id)) {
      toast.warning("Product already exists in cart");
      return;
    }

    setCart(prev => [...prev, product]);
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
    setPaymentMethod(prev => ({ ...prev, [product.id]: "cod" }));
    toast.success("Product added to cart!");
    setPoints(prev => prev + 10); 

    if (Math.random() > 0.5) {
      toast.info(`Customers usually buy 2 of this item. Want to add 2?`);
    }

    
    if (Math.random() > 0.7) setSpinOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    setQuantities(prev => { const copy = { ...prev }; delete copy[id]; return copy; });
    setPaymentMethod(prev => { const copy = { ...prev }; delete copy[id]; return copy; });
  };

  const handleQtyChange = (id, value) => {
    if (value < 1) return;
    setQuantities(prev => ({ ...prev, [id]: value }));
  };

  const handleConfirmOrder = (item) => {
    const confirmedOrder = {
      id: item.id,
      title: item.title,
      quantity: quantities[item.id] || 1,
      price: item.price,
      total: item.price * (quantities[item.id] || 1),
      paymentMethod: paymentMethod[item.id] || "cod",
      delivery: `${Math.floor(Math.random() * 5) + 2} days` 
    };
    setConfirmedOrders(prev => [...prev, confirmedOrder]);
    removeFromCart(item.id);
    toast.success("Order placed successfully!");
    setPoints(prev => prev + 20); 
  };

  if (loading)
    return (
      <h2 className="text-center text-xl mt-10 animate-pulse text-gray-700">
        Loading...
      </h2>
    );

  return (
    <Router>
      <Layout
        cart={cart}
        view={view}
        setView={setView}
        search={search}
        setSearch={setSearch}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        theme={theme}
      >
        {view === "home" && (
          <Home
            products={products}
            filteredProducts={filteredProducts}
            addToCart={addToCart}
          />
        )}
        {view === "cart" && (
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            setSelectedOrder={handleConfirmOrder}
            quantities={quantities}
            paymentMethod={paymentMethod}
            handleQtyChange={handleQtyChange}
            products={products}
          />
        )}
        {view === "orders" && (
          <Orders confirmedOrders={confirmedOrders} removeOrder={(id) => {
            setConfirmedOrders(prev => prev.filter(order => order.id !== id));
            toast.info("Order removed!");
          }} points={points} />
        )}
      </Layout>

      {spinOpen && <SpinWheel close={() => setSpinOpen(false)} />}
      <ChatAssistant products={products} addToCart={addToCart} />
    </Router>
  );
}

export default App;


