import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../config";

const Receipt = () => {
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [userName, setUserName] = useState(""); // Store user name
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user details
        const fetchUser = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/user", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                        Accept: "application/json",
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUserName(userData.name);
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();

        // Parse payment details
        const urlParams = new URLSearchParams(location.search);
        const encodedData = urlParams.get("data");

        if (encodedData) {
            try {
                const decodedString = atob(encodedData);
                const parsedData = JSON.parse(decodedString);

                const sanitizedTotalAmount = parseFloat(parsedData.total_amount.replace(/,/g, ""));
                parsedData.total_amount = sanitizedTotalAmount;

                setPaymentDetails(parsedData);

                createOrder(parsedData);
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

        try {
            const response = await fetch(`${config.API_BASE}/orders`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${loginToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error("Failed to create order");
            }

            const result = await response.json();
            console.log("Order created successfully:", result);
        } catch (error) {
            console.error("Error creating order:", error);
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
                    {/* Date & Transaction Code Section */}
                    <div className="text-right">
                        <p className="text-gray-700 text-sm"><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                        <p className="text-gray-700 text-sm"><strong>Transaction Code:</strong> {paymentDetails?.transaction_code}</p>
                    </div>
                    {/* Logo & Title Section */}
                    <div className="flex items-center gap-3">
                        <img src="/icon.png" alt="SBS Optics" className="w-25 h-25" />
                        <div>
                            <h1 className="text-xl font-bold text-blue-700">SBS Optics</h1>
                            <p className="text-gray-600 text-sm">Official Payment Receipt</p>
                        </div>
                    </div>

                {/* Official Payment Partner */}
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <p className="text-gray-700 font-medium">Official Payment Partner:</p>
                    <img src="/esewa_og.webp" alt="Esewa" className="w-60 h-30" />
                </div>

                {/* Payment Code */}
                <div className="mb-4">
                    <p className="text-gray-700"><strong>Transaction UUID:</strong> {paymentDetails?.transaction_uuid}</p>
                </div>

                {/* User Details */}
                <div className="border-b pb-4 mb-4">
                    <p className="text-gray-700"><strong>Customer Name:</strong> {userName || "N/A"}</p>
                </div>

                {/* Payment Information (Most Important) */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 mb-4">
                    <p className="text-lg font-semibold text-blue-700">Payment Information</p>
                    <p className="text-gray-700"><strong>Status:</strong>
                        <span className={`ml-2 text-${paymentDetails?.status === 'COMPLETE' ? 'green' : 'red'}-600 font-semibold`}>
                            {paymentDetails?.status}
                        </span>
                    </p>
                    <p className="text-gray-700"><strong>Total Amount:</strong> Rs. {paymentDetails?.total_amount.toFixed(2)}</p>
                    <p className="text-gray-700"><strong>Amount in Words:</strong> {numberToWords(paymentDetails?.total_amount)} Rupees only</p>
                </div>

                {/* Product Code */}
                <div className="border-b pb-4 mb-4">
                    <p className="text-gray-700"><strong>Product Code:</strong> {paymentDetails?.product_code}</p>
                </div>

                {/* Print Button */}
                <div className="mt-6 flex justify-center gap-4">
                    <button
                        onClick={handlePrint}
                        className="print:hidden bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Print Receipt
                    </button>
                    <button
                        onClick={() => navigate("/order")}
                        className="print:hidden bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
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
            {/* CSS for Print Styling */}
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
