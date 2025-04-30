import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

const BrandEdit = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/brands/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
          Accept: "application/json",
        },
      })
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setCategoryId(data.category_id);
      });

    fetch("http://127.0.0.1:8000/api/categories", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/brands/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        },
        body: JSON.stringify({ name, category_id: categoryId }),
      });

      if (response.ok) {
        toast.success("Brand updated successfully!", {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
        navigate("/brand-list");
      } else {
        toast.error("Failed to update brand.", {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("An error occurred while updating the brand.", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
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
        <h1 className="text-2xl font-bold mb-4">Edit Brand</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Brand Name"
            className="border p-2 w-full mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <select
            className="border p-2 w-full mb-2"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2"
          >
            Update
          </button>
        </form>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default BrandEdit;
