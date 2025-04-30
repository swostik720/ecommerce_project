import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify"; // Import toast

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/cart", {
            headers: { Authorization: `Bearer ${localStorage.getItem("loginToken")}` },
        })
            .then((res) => res.json())
            .then((data) => {
                setCart(data);
                calculateTotal(data);
            });
    }, []);

    const calculateTotal = (items) => {
        let total = 0;
        items.forEach((item) => {
            total += parseFloat(item.product.price) * item.quantity;
        });
        setTotalAmount(total.toFixed(2));
    };

    const updateQuantity = async (id, newQuantity) => {
        if (newQuantity < 1) return; // Prevent negative or zero quantity

        await fetch(`http://127.0.0.1:8000/api/cart/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
            },
            body: JSON.stringify({ product_id: id, quantity: newQuantity }),
        });

        const updatedCart = cart.map((item) =>
            item.product.id === id ? { ...item, quantity: newQuantity } : item
        );
        setCart(updatedCart);
        calculateTotal(updatedCart);
    };

    const removeItem = async (id) => {
        await fetch(`http://127.0.0.1:8000/api/cart/remove/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${localStorage.getItem("loginToken")}` },
        });

        const updatedCart = cart.filter((item) => item.product.id !== id);
        setCart(updatedCart);
        calculateTotal(updatedCart);

        // Show toast message when item is removed from the cart
        toast.success("Product removed from the cart!", {
            position: "top-center",
            autoClose: 2000,
            theme: "colored",
        });
    };

    const handleCheckout = async () => {
        try {
            localStorage.setItem("cartItems", JSON.stringify(cart));

            const response = await fetch("http://127.0.0.1:8000/api/esewa/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                },
                body: JSON.stringify({
                    products: cart.map((item) => ({
                        slug: item.product.slug,
                        quantity: item.quantity, // Include quantity
                        price: item.product.price,
                    })),
                }),
            });
    
            const htmlResponse = await response.text(); // Read the response as HTML
    
            // Create a temporary form and submit it
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = htmlResponse;
            document.body.appendChild(tempDiv);
            tempDiv.querySelector("form").submit();
    
        } catch (error) {
            console.error("Checkout Error:", error);
            alert("Error processing payment.");
        }
    };

    return (
        <div>
        <Navbar />
            <div className="p-6 pt-20">
            <button
                onClick={() => navigate("/shop")}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mb-4 shadow-md"
            >
                ← Back to Shop
            </button>
            </div>
            <div className="flex flex-col md:flex-row p-6 gap-6">
                <div className="w-full md:w-3/5 bg-white p-4 shadow-md rounded-md">
                    <h2 className="text-2xl font-semibold mb-4">Cart ({cart.length} items)</h2>
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <div key={item.id} className="flex items-center justify-between border-b py-4">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={`http://127.0.0.1:8000/storage/${item.product.image}`}
                                        alt={item.product.name}
                                        className="w-20 h-20 rounded-md object-cover"
                                    />
                                    <div>
                                        <p className="font-medium text-lg">{item.product.name}</p>
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="bg-gray-300 px-2 py-1 rounded-l-md"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                                                className="w-12 text-center border-t border-b border-gray-300"
                                            />
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="bg-gray-300 px-2 py-1 rounded-r-md"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.product.id)}
                                            className="text-red-500 text-sm mt-2"
                                        >
                                            🗑️ Remove from the cart
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="font-semibold text-xl">Rs.{(item.product.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Your cart is empty.</p>
                    )}
                    <p className="text-blue-500 text-sm mt-4">
                        ⚠️ Do not delay the purchase, adding items to your cart does not mean booking them.
                    </p>
                </div>

                <div className="w-full md:w-2/5 bg-white p-4 shadow-md rounded-md">
                    <h1 className="text-lg font-bold mb-3">Order Summary</h1>
                    <div className="border-t my-2"></div>
                    <h3 className="text-lg font-semibold mb-3">The total amount</h3>
                    <div className="flex justify-between text-gray-700 mb-2">
                        <p>Amount Payable</p>
                        <p className="font-semibold text-xl">Rs.{totalAmount}</p>
                    </div>
                    <div className="flex justify-between text-gray-700 mb-2">
                        <p>Shipping</p>
                        <p className="font-semibold text-xl">Free</p>
                    </div>

                    <div className="border-t my-2"></div>
                    <div className="flex justify-between text-lg font-semibold mb-4">
                        <p>The total amount (including VAT)</p>
                        <p>Rs.{totalAmount}</p>
                    </div>
                    <div className="border-t my-2"></div>

                    <img src="/esewa_og.webp" alt="Esewa" />
                    <button
                        onClick={handleCheckout}
                        className="bg-blue-500 text-white w-full py-2  rounded-md hover:bg-blue-600 shadow-md"
                    >
                        Place Order
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
