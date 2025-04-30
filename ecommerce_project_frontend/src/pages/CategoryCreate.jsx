import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

const CategoryCreate = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/api/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                },
                body: JSON.stringify({ name }),
            });
            if (response.ok) {
                toast.success("Category created successfully!", {
                    position: "top-center", // Top toast
                    autoClose: 2000,
                    theme: "colored",
                });
                // alert("Category created successfully");
                navigate("/category-list");
                setTimeout(() => {
                    navigate("/category-list");
                }, 5000); // Delay for 2 seconds
            } else {
                toast.error("Failed to create category.", {
                    position: "top-center", // Top toast
                    autoClose: 2000,
                    theme: "colored",
                });
            }
        } catch (error) {
            toast.error("An error occurred while creating the category.", {
                position: "top-center", // Top toast
                autoClose: 2000,
                theme: "colored",
            });
        }
    };

    return (
        <div>
            <Navbar />
            <div className="p-6 pt-20">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg mb-4"
                >
                    ← Back
                </button>
                <h1 className="text-2xl font-bold mb-4">Create Category</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Category Name"
                        className="border p-2 w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2">
                        Save
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default CategoryCreate;
