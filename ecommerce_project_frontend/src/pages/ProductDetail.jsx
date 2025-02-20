import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/products/details/${id}`, {
          headers: { Accept: "application/json" },
        });

        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);

        const data = await res.json();
        setProduct(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/brands");
        if (!res.ok) throw new Error("Failed to fetch brands");
        const data = await res.json();
        setBrands(data);
      } catch (err) {
        console.error("Error fetching brands:", err);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchBrands();
    fetchCategories();
  }, []);

  // Find the brand for the product
  const productBrand = brands.find((brand) => brand.id === product?.brand_id);
  // Find the category for the brand
  const productCategory = productBrand ? categories.find((category) => category.id === productBrand.category_id) : null;

  // Function to handle Add to Cart
  const handleAddToCart = async () => {
    const loginToken = localStorage.getItem("loginToken"); // Get auth token
    console.log(loginToken);
    if (!loginToken) {
      navigate("/login"); // Redirect to login if user is not logged in
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1, // Default quantity is 1
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Product added to cart successfully!");
        navigate("/cart"); // Redirect to cart page
      } else {
        alert(data.message || "Failed to add product to cart.");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  if (loading) return <p className="p-6">Loading product details...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

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
      {product ? (
        <>
          <img
            src={`http://127.0.0.1:8000/storage/${product.image}`}
            alt={product.name}
            className="w-64 h-64 object-cover rounded-md shadow-md"
            onError={(e) => (e.target.src = "/fallback-image.jpg")} // Handles broken images
          />
          <h1 className="text-2xl font-bold mt-2">{product.name}</h1>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-lg font-semibold mt-2">Price: Rs.{product.price}</p>
          <p className="text-gray-600">Brand: {productBrand?.name || "Unknown"}</p>
          <p className="text-gray-600">Category: {productCategory?.name || "Unknown"}</p>

          {/* Add to Cart Button */}
          <button
            className="bg-green-500 text-white px-4 py-2 mt-4 rounded-lg shadow-md hover:bg-green-600"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </>
      ) : (
        <p className="text-gray-500">Product not found.</p>
      )}
    </div>
    <Footer />
    </div>
  );
};

export default ProductDetail;
