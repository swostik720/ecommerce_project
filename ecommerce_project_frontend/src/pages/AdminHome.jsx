import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBox, FaTags, FaClipboardList, FaShoppingCart } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminHome = () => {
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem("isAdmin") === "1";

    if (!isAdmin) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="flex-grow bg-gradient-to-b cg-gray-100 flex flex-col items-center p-25">
                <h1 className="text-4xl font-bold text-blue-600 mb-8">
                    Welcome, Admin 
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl w-full">
                    {/* Category */}
                    <div
                        className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-transform duration-300"
                    >
                        <FaTags className="text-blue-600 text-5xl mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-700">Category</h2>
                        <button
                            onClick={() => navigate("/category-list")}
                            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-500 transition"
                        >
                            Manage Categories
                        </button>
                    </div>

                    {/* Brand */}
                    <div
                        className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-transform duration-300"
                    >
                        <FaBox className="text-blue-600 text-5xl mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-700">Brand</h2>
                        <button
                            onClick={() => navigate("/brand-list")}
                            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-500 transition"
                        >
                            Manage Brands
                        </button>
                    </div>

                    {/* Product */}
                    <div
                        className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-transform duration-300"
                    >
                        <FaClipboardList className="text-blue-600 text-5xl mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-700">Product</h2>
                        <button
                            onClick={() => navigate("/product-list")}
                            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-500 transition"
                        >
                            Manage Products
                        </button>
                    </div>

                    {/* Orders */}
                    <div
                        className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-transform duration-300"
                    >
                        <FaShoppingCart className="text-blue-600 text-5xl mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-700">Orders</h2>
                        <button
                            onClick={() => navigate("/order")}
                            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-500 transition"
                        >
                            Manage Orders
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AdminHome;
