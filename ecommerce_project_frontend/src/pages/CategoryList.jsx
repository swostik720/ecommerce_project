import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/categories", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
                Accept: "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.error("Error fetching categories:", err));
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            await fetch(`http://127.0.0.1:8000/api/categories/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${localStorage.getItem("loginToken")}` },
            });
            setCategories(categories.filter((category) => category.id !== id));
        }
    };

    return (
        <div>
            <Navbar />
        <div className="p-6 pt-20">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mb-4"
            >
                ← Back
            </button>

            <h1 className="text-2xl font-bold mb-4">Categories</h1>
            <Link to="/category-create" className="bg-green-600 text-white px-4 py-2 rounded-lg">
                Add Category
            </Link>
            <ul className="mt-4">
                {categories.map((category) => (
                    <li key={category.id} className="flex justify-between p-2 border-b">
                        {category.name}
                        <div>
                            <Link to={`/category-edit/${category.id}`} className="text-blue-600 mr-2">
                                Edit
                            </Link>
                            <button onClick={() => handleDelete(category.id)} className="text-red-600">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        <Footer />
        </div>
    );
};

export default CategoryList;
