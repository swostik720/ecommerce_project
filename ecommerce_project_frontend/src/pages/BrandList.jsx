import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/brands", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
          Accept: "application/json",
        },
      })
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((err) => console.error("Error fetching brands:", err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/brands/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("loginToken")}` },
        });

        if (response.ok) {
          setBrands(brands.filter((brand) => brand.id !== id));
          toast.success("Brand deleted successfully!", {
            position: "top-center",
            autoClose: 2000,
            theme: "colored",
          });
        } else {
          toast.error("Failed to delete brand.", {
            position: "top-center",
            autoClose: 2000,
            theme: "colored",
          });
        }
      } catch (error) {
        toast.error("An error occurred while deleting the brand.", {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
      }
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
        <h1 className="text-2xl font-bold mb-4">Brands</h1>
        <Link to="/brand-create" className="bg-green-600 text-white px-4 py-2 rounded-lg">
          Add Brand
        </Link>
        <ul className="mt-4">
          {brands.map((brand) => (
            <li key={brand.id} className="flex justify-between p-2 border-b">
              {brand.name} (Category: {brand.category?.name || "N/A"})
              <div>
                <Link to={`/brand-edit/${brand.id}`} className="text-blue-600 mr-2">
                  Edit
                </Link>
                <button onClick={() => handleDelete(brand.id)} className="text-red-600">
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

export default BrandList;
