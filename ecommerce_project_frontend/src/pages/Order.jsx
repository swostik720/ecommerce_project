import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const loginToken = localStorage.getItem("loginToken"); // Using loginToken
    const isAdmin = localStorage.getItem("isAdmin") === "1";
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const endpoint = isAdmin ? `${config.API_BASE}/orders` : `${config.API_BASE}/user/orders`;
                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${loginToken}`,
                        "Content-Type": "application/json"
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch orders");
                }
                const data = await response.json();
                setOrders(data);
                console.log("Fetched orders:", data);
                console.log(loginToken);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [isAdmin]);

    if (loading) return <p className="text-center text-white text-lg mt-6">Loading orders...</p>;

    return (
        <div>
            <Navbar />
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
            <div className="bg-gray-100 shadow-lg rounded-lg p-6 w-full max-w-5xl">
             {/* Back Button */}
        <button
                onClick={() => navigate(-1)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mb-4"
            >
                ← Back
            </button>
                <h2 className="text-3xl font-bold text-center text-blue-500 mb-6 ">Order History</h2>
                <div className="overflow-x-auto">
                    <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-blue-500 text-gray-700 uppercase text-sm">
                            <tr>
                                <th className="px-6 py-3 text-left border">Transaction Code</th>
                                <th className="px-6 py-3 text-left border">Amount</th>
                                <th className="px-6 py-3 text-left border">Status</th>
                                {isAdmin && <th className="px-6 py-3 text-left border">User</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order, index) => (
                                    <tr 
                                        key={order.id} 
                                        className={`border-b text-gray-700 text-md ${
                                            index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                        } hover:bg-gray-200 transition-all duration-200`}
                                    >
                                        <td className="px-6 py-3 border">{order.transaction_code}</td>
                                        <td className="px-6 py-3 border font-medium">Rs. {order.total_amount}</td>
                                        <td className={`px-6 py-3 border font-semibold ${
                                            order.status === 'COMPLETE' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {order.status}
                                        </td>
                                        {isAdmin && <td className="px-6 py-3 border">{order.user?.name}</td>}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={isAdmin ? 4 : 3} className="text-center py-6 text-gray-600">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <Footer />
        </div>

    );
};

export default Order;
