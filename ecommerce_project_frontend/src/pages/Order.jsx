import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config";

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const loginToken = localStorage.getItem("loginToken");
    const isAdmin = localStorage.getItem("isAdmin") === "1";
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const endpoint = isAdmin ? `${config.API_BASE}/orders` : `${config.API_BASE}/user/orders`;
                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${loginToken}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch orders");
                }

                const data = await response.json();
                console.log(data); // Check the structure of the response
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [isAdmin]);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await fetch(`${config.API_BASE}/orders/${orderId}/status`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${loginToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: newStatus, // The new status from the dropdown
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update order status");
            }

            const data = await response.json();
            // Optionally update local state to reflect the change immediately
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );
            toast.success("Order status updated successfully!", {
                position: "top-center",
                autoClose: 2000,
                theme: "colored",
            });
            console.log(data.message); // "Order status updated successfully"
        } catch (error) {
            console.error("Error updating order status:", error);
            toast.error("Failed to update order status. Please try again.", {
                position: "top-center",
                autoClose: 2000,
                theme: "colored",
            });
        }
    };

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

    const handleViewReceipt = (receiptUrl) => {
        if (receiptUrl) {
            window.open(receiptUrl, "_blank");
        } else {
            console.error("No receipt URL available");
        }
    };

    if (loading) return <p className="text-center text-gray-700 text-lg mt-6">Loading orders...</p>;

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-6xl">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg mb-4"
                    >
                        ← Back
                    </button>
                    <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">
                        {isAdmin ? "All Orders" : "Order History"}
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-blue-500 text-white uppercase text-sm">
                                <tr>
                                    <th className="px-6 py-3 text-left border">Transaction</th>
                                    <th className="px-6 py-3 text-left border">Amount</th>
                                    <th className="px-6 py-3 text-left border">Status</th>
                                    {isAdmin && <th className="px-6 py-3 text-left border">User</th>}
                                    <th className="px-6 py-3 text-left border">Details</th>
                                    <th className="px-6 py-3 text-left border">Receipt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length > 0 ? (
                                    orders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="border-b text-gray-700 text-md hover:bg-gray-200 transition-all duration-200"
                                        >
                                            <td className="px-6 py-3 border">
                                                {order.payment?.transaction_uuid || "N/A"}
                                            </td>
                                            <td className="px-6 py-3 border font-medium">
                                                Rs. {order.payment?.total_amount || "0"}
                                            </td>
                                            <td className="px-6 py-3 border font-semibold">
                                                {isAdmin ? (
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) =>
                                                            handleStatusChange(order.id, e.target.value)
                                                        }
                                                        className={`p-2 rounded-md ${getStatusColor(
                                                            order.status
                                                        )}`}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="processing">Processing</option>
                                                        <option value="shipped">Shipped</option>
                                                        <option value="delivered">Delivered</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select>
                                                ) : (
                                                    <span
                                                        className={`px-2 py-1 rounded-full ${getStatusColor(
                                                            order.status
                                                        )}`}
                                                    >
                                                        {order.status}
                                                    </span>
                                                )}
                                            </td>
                                            {isAdmin && (
                                                <td className="px-6 py-3 border">
                                                    {order.user?.name || "N/A"}
                                                </td>
                                            )}
                                            <td className="px-6 py-3 border">
                                                <button
                                                    onClick={() => navigate(`/order/${order.id}`)}
                                                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                            <td className="px-6 py-3 border">
                                                {order.receipt_url ? (
                                                    <button
                                                        onClick={() =>
                                                            handleViewReceipt(order.receipt_url)
                                                        }
                                                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                                    >
                                                        View Receipt
                                                    </button>
                                                ) : (
                                                    <span className="text-gray-500">No Receipt</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={isAdmin ? 6 : 5}
                                            className="text-center py-6 text-gray-600"
                                        >
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