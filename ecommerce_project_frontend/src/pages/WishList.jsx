import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify"; // Import toast

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/wishlist", {
            headers: { Authorization: `Bearer ${localStorage.getItem("loginToken")}` },
        })
            .then((res) => res.json())
            .then((data) => setWishlist(data));
    }, []);

    const removeFromWishlist = async (id) => {
        await fetch(`http://127.0.0.1:8000/api/wishlist/remove/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${localStorage.getItem("loginToken")}` },
        });

        setWishlist(wishlist.filter((item) => item.id !== id));
        toast.success("Product removed from wishlist!", {
            position: "top-center",
            autoClose: 2000,
            theme: "colored",
        });
    };

    const handleAddToCart = async (item) => {
        const loginToken = localStorage.getItem("loginToken");
        if (!loginToken) {
            navigate("/login");
            return;
        }
    
        // Add to cart first
        fetch("http://127.0.0.1:8000/api/cart/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${loginToken}`,
            },
            body: JSON.stringify({
                product_id: item.product.id,
                quantity: 1,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json(); // Return JSON if successful
                } else {
                    throw new Error("Failed to add product to cart.");
                }
            })
            .then((data) => {
                // Show success toast first
                toast.success("Product added to cart successfully!", {
                    position: "top-center", // Top toast
                    autoClose: 2000,
                    theme: "colored",
                });
    
                // Now, remove from wishlist and navigate to cart after the toast has shown
                setTimeout(() => {
                    removeFromWishlist(item.id); // Remove item from wishlist
                    navigate("/cart"); // Navigate to the cart page
                }, 2000); // 2000ms (2 seconds) to wait until the toast auto-closes
            })
            .catch((err) => {
                console.error("Error adding to cart:", err);
                toast.error(err.message || "Something went wrong. Please try again.", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "colored",
                });
            });
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
                <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
                {wishlist.length > 0 ? (
                    wishlist.map((item) => (
                        <div
                            key={item.id}
                            className="border p-4 mb-4 rounded-lg shadow-md flex items-center"
                        >
                            {/* Product Image */}
                            <img
                                src={`http://127.0.0.1:8000/storage/${item.product.image}`}
                                alt={item.product.name}
                                className="w-28 h-28 rounded-md object-cover"
                            />

                            {/* Product Details - Name, Price, Remove Button */}
                            <div className="ml-4 flex-1">
                                <h2 className="text-lg font-semibold">{item.product.name}</h2>
                                <p className="text-gray-700">Price: Rs. {item.product.price}</p>
                                <button
                                    className="text-red-500 text-sm mt-2"
                                    onClick={() => removeFromWishlist(item.id)}
                                >
                                    🗑️ Remove from Wishlist
                                </button>

                                {/* Buttons - View Product & Add to Cart */}
                                <div className="mt-4">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                                        onClick={() => navigate(`/product/details/${item.product.id}`)}
                                    >
                                        View Product
                                    </button>
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        Add to Cart 🛒
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Your wishlist is empty.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Wishlist;
