import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../config";

const Receipt = () => {
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [userName, setUserName] = useState(""); // Name from order
    const [username, setUsername] = useState(""); // Name from logged-in user
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const encodedData = urlParams.get("data");

        if (encodedData) {
            try {
                const decodedString = atob(encodedData);
                const parsedData = JSON.parse(decodedString);

                const sanitizedTotalAmount = parseFloat(parsedData.total_amount.replace(/,/g, ""));
                parsedData.total_amount = sanitizedTotalAmount;

                setPaymentDetails(parsedData);

                createOrder(parsedData); // Create order and fetch order user
                fetchUser(); // Fetch logged-in user
            } catch (error) {
                console.error("Error parsing payment details:", error);
                alert("Error loading receipt.");
            }
        } else {
            alert("No payment details found.");
        }
    }, [location]);

    const numberToWords = (num) => {
        const words = [
            "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
            "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
            "Seventeen", "Eighteen", "Nineteen", "Twenty", "Thirty", "Forty", "Fifty",
            "Sixty", "Seventy", "Eighty", "Ninety"
        ];

        const convert = (n) => {
            if (n < 20) return words[n];
            if (n < 100) return words[18 + Math.floor(n / 10)] + (n % 10 !== 0 ? " " + words[n % 10] : "");
            if (n < 1000) return words[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " and " + convert(n % 100) : "");
            if (n < 1000000) return convert(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + convert(n % 1000) : "");
            return "Amount too large";
        };

        return convert(num);
    };

    const handlePrint = () => {
        window.print();
    };

    const createOrder = async (data) => {
        const loginToken = localStorage.getItem("loginToken");
        if (!loginToken) {
            console.error("User is not authenticated");
            return;
        }

        const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

        if (cart.length === 0) {
            console.error("No cart items found");
            return;
        }

        try {
            const response = await fetch(`${config.API_BASE}/orders`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${loginToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transaction_code: data.transaction_code,
                    total_amount: data.total_amount,
                    products: cart.map(item => ({
                        id: item.product.id,
                        quantity: item.quantity,
                        price: item.product.price,
                    })),
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create order");
            }

            const result = await response.json();
            console.log("Order created:", result);

            const orderId = result.order.id;
            fetchOrderUser(orderId);

            localStorage.removeItem("cartItems");

        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    const fetchOrderUser = async (orderId) => {
        const loginToken = localStorage.getItem("loginToken");
        try {
            const response = await fetch(`${config.API_BASE}/orders/${orderId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${loginToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const orderData = await response.json();
                console.log("Fetched Order:", orderData);
                setUserName(orderData.user?.name || "N/A");
            } else {
                console.error("Failed to fetch order details");
            }
        } catch (error) {
            console.error("Error fetching order:", error);
        }
    };

    const fetchUser = async () => {
        try {
            const response = await fetch(`${config.API_BASE}/user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                const userData = await response.json();
                console.log("Fetched logged-in user:", userData);
                setUsername(userData.name);
            } else {
                console.error("Failed to fetch user data");
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 border border-gray-300">
                <button
                    onClick={() => navigate("/shop")}
                    className="print:hidden bg-gray-500 text-white px-4 py-2 rounded-lg mb-4 shadow-md"
                >
                    ← Continue Shopping
                </button>

                {/* Date & Transaction Code */}
                <div className="text-right mb-4">
                    <p className="text-gray-700 text-sm"><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                    <p className="text-gray-700 text-sm"><strong>Transaction Code:</strong> {paymentDetails?.transaction_code}</p>
                </div>

                {/* Logo & Title */}
                <div className="flex items-center gap-3 mb-6">
                    <img src="/icon.png" alt="SBS Optics" className="w-16 h-16" />
                    <div>
                        <h1 className="text-2xl font-bold text-blue-700">SBS Optics</h1>
                        <p className="text-gray-600 text-sm">Official Payment Receipt</p>
                    </div>
                </div>

                {/* Payment Partner */}
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <p className="text-gray-700 font-medium">Official Payment Partner:</p>
                    <img src="/esewa_og.webp" alt="Esewa" className="w-32 h-12 object-contain" />
                </div>

                {/* Transaction UUID */}
                <div className="mb-4">
                    <p className="text-gray-700"><strong>Transaction UUID:</strong> {paymentDetails?.transaction_uuid}</p>
                </div>

                {/* Customer Name */}
                <div className="border-b pb-4 mb-4">
                    <p className="text-gray-700">
                        <strong>Customer Name:</strong> {userName || username || "N/A"}
                    </p>
                </div>

                {/* Payment Information */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 mb-4">
                    <p className="text-lg font-semibold text-blue-700 mb-2">Payment Information</p>
                    <p className="text-gray-700">
                        <strong>Status:</strong>
                        <span className={`ml-2 text-${paymentDetails?.status === 'COMPLETE' ? 'green' : 'red'}-600 font-semibold`}>
                            {paymentDetails?.status}
                        </span>
                    </p>
                    <p><strong>Total Amount:</strong> Rs. {paymentDetails?.total_amount ? paymentDetails.total_amount.toFixed(2) : "0.00"}</p>
                    <p className="text-gray-700"><strong>Amount in Words:</strong> {numberToWords(paymentDetails?.total_amount)} Rupees only</p>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-center gap-4">
                    <button
                        onClick={handlePrint}
                        className="print:hidden bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Print Receipt
                    </button>
                    <button
                        onClick={() => navigate("/order")}
                        className="print:hidden bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                        Track your Order
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center text-gray-500 text-sm">
                    <p>Thank you for your payment!</p>
                    <p>SBS Optics | optics.sbs@gmail.com</p>
                </div>
            </div>

            {/* Print CSS */}
            <style>
                {`
          @media print {
            .print\\:hidden {
              display: none !important;
            }
          }
        `}
            </style>
        </div>
    );
};

export default Receipt;
