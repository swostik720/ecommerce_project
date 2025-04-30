import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

const CategoryEdit = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/categories/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                Accept: "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setName(data.name);
            })
            .catch((err) => console.error("Error fetching category:", err));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/categories/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                },
                body: JSON.stringify({ name }),
            });
            if (response.ok) {
                toast.success("Category updated successfully!", {
                    position: "top-center", // Top toast
                    autoClose: 2000,
                    theme: "colored",
                });
                navigate("/category-list");
            } else {
                toast.error("Failed to update category.", {
                    position: "top-center", // Top toast
                    autoClose: 2000,
                    theme: "colored",
                });
            }
        } catch (error) {
            toast.error("An error occurred while updating the category.", {
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
                <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
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
                        Update
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default CategoryEdit;
