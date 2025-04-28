import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBox,
  FaTags,
  FaClipboardList,
  FaShoppingCart,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminHome = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "1";

  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    brands: 0,
    orders: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
          Accept: "application/json",
        };

        const [productRes, categoryRes, brandRes, orderRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/products", { headers }),
          fetch("http://127.0.0.1:8000/api/categories", { headers }),
          fetch("http://127.0.0.1:8000/api/brands", { headers }),
          fetch("http://127.0.0.1:8000/api/orders", { headers }),
        ]);

        if (productRes.ok && categoryRes.ok && brandRes.ok && orderRes.ok) {
          const [products, categories, brands, orders] = await Promise.all([
            productRes.json(),
            categoryRes.json(),
            brandRes.json(),
            orderRes.json(),
          ]);

          setStats({
            products: products.length,
            categories: categories.length,
            brands: brands.length,
            orders: orders.length,
          });
        }
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };

    fetchStats();
  }, []);

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100">
        <h1 className="text-5xl font-bold text-red-600">⛔ Access Denied</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex-grow pt-24 px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-blue-700 mb-2 animate-pulse">
            🔧 Welcome, Admin
          </h1>
          <p className="text-gray-600 text-lg">Manage your store with ease!</p>
        </div>

        {/* Quick Stats */}
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">📊 Quick Stats</h1>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-5xl mx-auto mb-20">
          <StatCard title="Total Products" value={stats.products} color="blue" />
          <StatCard title="Total Orders" value={stats.orders} color="green" />
          <StatCard title="Total Categories" value={stats.categories} color="yellow" />
          <StatCard title="Total Brands" value={stats.brands} color="purple" />
        </section>

        {/* Management Cards */}
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">🛠️ Management Dashboard</h1>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <ManagementCard
            title="Category"
            label="Manage Categories"
            icon={<FaTags className="text-6xl text-blue-500 animate-pulse" />}
            onClick={() => navigate("/category-list")}
          />
          <ManagementCard
            title="Brand"
            label="Manage Brands"
            icon={<FaBox className="text-6xl text-green-500 animate-pulse" />}
            onClick={() => navigate("/brand-list")}
          />
          <ManagementCard
            title="Product"
            label="Manage Products"
            icon={<FaClipboardList className="text-6xl text-yellow-500 animate-pulse" />}
            onClick={() => navigate("/product-list")}
          />
          <ManagementCard
            title="Orders"
            label="Manage Orders"
            icon={<FaShoppingCart className="text-6xl text-pink-500 animate-pulse" />}
            onClick={() => navigate("/order")}
          />
        </section>
      </div>

      <Footer />
    </div>
  );
};

// Quick Stat Card Component
const StatCard = ({ title, value, color }) => {
  const bgColor = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500",
  }[color];

  return (
    <div
      className={`${bgColor} text-white p-8 rounded-2xl shadow-xl flex flex-col items-center space-y-3 transform transition duration-300 hover:scale-105`}
    >
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="text-5xl font-bold">{value}</p>
    </div>
  );
};

// Management Action Card
const ManagementCard = ({ icon, title, label, onClick }) => {
  return (
    <div className="bg-white border-2 border-gray-200 hover:border-blue-400 rounded-3xl shadow-2xl p-10 flex flex-col items-center text-center space-y-6 transition-all duration-300 hover:scale-105">
      {icon}
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
      <button
        onClick={onClick}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
      >
        {label}
      </button>
    </div>
  );
};

export default AdminHome;
