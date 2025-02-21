import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const isAdmin = localStorage.getItem("isAdmin") === "1";

    const isAuthenticated = !!localStorage.getItem("loginToken");
    // ✅ Fetch cart count dynamically
    useEffect(() => {
        if (isAuthenticated) {
            fetchCartCount();
        }
    }, [isAuthenticated]);

    const fetchCartCount = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/cart", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                const cartData = await response.json();
                const totalQuantity = cartData.reduce((total, item) => total + item.quantity, 0);
                setCartItemCount(totalQuantity);
            } else {
                console.error("Failed to fetch cart data");
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/logout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                    Accept: "application/json",
                },
            });
            if (response.ok) {
                localStorage.removeItem("loginToken"); // Remove token
                navigate("/login"); // Redirect to login
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const renderMiddleContent = () => {
        if (isAdmin) {
            return (
                <div className="flex space-x-4">
                    <button onClick={() => navigate("/adminHome")} className="text-white hover:underline">
                        Admin Home
                    </button>
                    <button onClick={() => navigate("/shop")} className="text-white hover:underline">
                        Shop
                    </button>
                </div>
            );
        }

        if (location.pathname === "/") {
            return (
                <div className="flex space-x-4">
                    <Link to="aboutus" smooth={true} duration={500} className="cursor-pointer hover:underline text-white">
                        About Us
                    </Link>
                    <Link to="faq" smooth={true} duration={500} className="cursor-pointer hover:underline text-white">
                        FAQ
                    </Link>
                    <Link to="contactus" smooth={true} duration={500} className="cursor-pointer hover:underline text-white">
                        Contact Us
                    </Link>
                    <button onClick={() => navigate("/shop")} className="text-white hover:underline">
                        Shop
                    </button>
                </div>
            );
        }

        if (
            location.pathname.startsWith("/shop") ||
            location.pathname.startsWith("/product/details") ||
            location.pathname.startsWith("/cart") ||
            location.pathname.startsWith("/wishlist") ||
            location.pathname.startsWith("/profile")
        ) {
            return (
                <button onClick={() => navigate("/shop")} className="text-white hover:underline">
                    Shop
                </button>
            );
        }

        return null;
    };

    const renderRightContent = () => {
        return (
            <div className="flex items-center space-x-4">
                {/* Wishlist Icon */}
                <button
                    onClick={() => navigate("/wishlist")}
                    className="relative text-white hover:text-gray-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z"
                        />
                    </svg>
                </button>

                {/* Cart Icon */}
                <button
                    onClick={() => navigate("/cart")}
                    className="relative text-white hover:text-gray-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {cartItemCount}
                    </span>
                </button>

                {/* User Icon */}
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center space-x-2 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg">
                            {!isAuthenticated ? (
                                <button
                                    onClick={() => navigate("/login")}
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                                >
                                    Login
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => navigate("/profile")}
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                                    >
                                        Profile
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-blue-500 p-4 flex justify-between items-center shadow-md">
            {/* Left Side */}
            <h1 className="flex items-center gap-3 text-white font-bold">
                <button onClick={() => navigate("/")}>
                    <img src="/icon.png" alt="SBS Optics" className="w-10 h-10 drop-shadow-[0_0_4px_white]" />
                </button>
                <button onClick={() => navigate("/")}>SBS Optics</button>
            </h1>

            {/* Middle Content */}
            <div>{renderMiddleContent()}</div>

            {/* Right Content */}
            {renderRightContent()}
        </nav>
    );
};

export default Navbar;