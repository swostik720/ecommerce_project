import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from "../config";

const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const loginToken = localStorage.getItem("loginToken");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`${config.API_BASE}/orders/${id}`, {
                    headers: {
                        Authorization: `Bearer ${loginToken}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch order details");
                }

                const data = await response.json();
                setOrder(data);
            } catch (error) {
                console.error("Error fetching order:", error);
                setOrder(null);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    // Show loading state while fetching
    if (loading) return <p className="text-center text-gray-700 mt-6">Loading order details...</p>;

    // Show error message if no order data found
    if (!order) return <p className="text-center text-red-500 mt-6">Order not found.</p>;

    // Function to determine status color
    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-600";
            case "processing":
                return "bg-blue-100 text-blue-600";
            case "shipped":
                return "bg-indigo-100 text-indigo-600";
            case "delivered":
                return "bg-green-100 text-green-600";
            case "cancelled":
                return "bg-red-100 text-red-600";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="flex justify-center items-center bg-gray-100 min-h-screen py-6">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-5xl w-full">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg mb-6 transition duration-300 hover:bg-gray-700 focus:outline-none"
                >
                    ← Back
                </button>

                {/* Order Details Header */}
                <h2 className="text-4xl font-semibold text-blue-600 text-center mb-6">Order Details</h2>

                {/* User and Order Info */}
                <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-xl font-bold text-gray-800">User Information</h3>
                    <p className="text-lg text-gray-600"><strong>User Name:</strong> {order.user?.name || 'N/A'}</p>
                    <p className="text-lg text-gray-600"><strong>Status:</strong> 
                        <span className={`px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                        </span>
                    </p>
                    <p className="text-lg text-gray-600"><strong>Transaction Code:</strong> {order.payment?.transaction_uuid}</p>
                    <p className="text-lg text-gray-600"><strong>Total Amount:</strong> Rs. {order.payment?.total_amount}</p>
                </div>

                {/* Product Section */}
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">Purchased Products</h4>
                {order.items && order.items.length > 0 ? (
                    <div className="space-y-6">
                        {order.items.map((item, index) => {
                            // Calculate total amount for the product (price * quantity)
                            const totalAmount = (parseFloat(item.price) * item.quantity).toFixed(2);

                            return (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                                    {/* Product Image */}
                                    <div className="flex justify-center mb-6">
                                        <img
                                            src={`http://127.0.0.1:8000/storage/${item.product?.image}`}
                                            alt={item.product?.name}
                                            className="w-full h-auto max-w-xs object-contain rounded-lg shadow-lg"
                                        />
                                    </div>

                                    {/* Product Details Table */}
                                    <div>
                                        <table className="min-w-full table-auto">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    <th className="p-4 text-left text-gray-700">Product Name</th>
                                                    <th className="p-4 text-left text-gray-700">Quantity</th>
                                                    <th className="p-4 text-left text-gray-700">Rate</th>
                                                    <th className="p-4 text-left text-gray-700">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b hover:bg-gray-50">
                                                    <td className="p-4">{item.product?.name}</td>
                                                    <td className="p-4 text-center">{item.quantity}</td>
                                                    <td className="p-4">Rs. {item.price}</td>
                                                    <td className="p-4">Rs. {totalAmount}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 mt-4">No products found for this order.</p>
                )}
            </div>
        </div>
    );
};

export default OrderDetails;

