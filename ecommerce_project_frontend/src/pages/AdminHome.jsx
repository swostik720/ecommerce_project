import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminHome = () => {
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem("isAdmin") === "1";

    if (!isAdmin) {
        return <h1 className="text-center text-red-600">Access Denied</h1>;
    }

    return (
        <><Navbar />
            <div className="min-h-screen bg-gradient-to-b from-gray-100 p-10 pt-50">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome Admin</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {/* Category Container */}
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Category</h2>
                        <button
                            onClick={() => navigate("/category-list")}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                        >
                            Manage Categories
                        </button>
                    </div>

                    {/* Brand Container */}
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Brand</h2>
                        <button
                            onClick={() => navigate("/brand-list")}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                        >
                            Manage Brands
                        </button>
                    </div>

                    {/* Product Container */}
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Product</h2>
                        <button
                            onClick={() => navigate("/product-list")}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                        >
                            Manage Products
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
            </>
    );
};

export default AdminHome;
