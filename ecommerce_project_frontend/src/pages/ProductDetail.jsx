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
  const [quantity, setQuantity] = useState(1); // State for quantity

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
  const productCategory = productBrand
    ? categories.find((category) => category.id === productBrand.category_id)
    : null;

  // Function to handle Add to Cart
  const handleAddToCart = async () => {
    const loginToken = localStorage.getItem("loginToken"); // Get auth token
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
          quantity: quantity, // Use the selected quantity
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

  const handleAddToWishList = async () => {
    const loginToken = localStorage.getItem("loginToken");
    if (!loginToken) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/wishlist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginToken}`,
        },
        body: JSON.stringify({ product_id: product.id }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Product added to wishlist successfully!");
        navigate("/wishlist");
      } else {
        alert(data.message || "Failed to add product to wishlist.");
      }
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  if (loading) return <p className="p-6">Loading product details...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-6 pt-20">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg mb-4 flex items-center"
        >
          ← Back
        </button>
        {product ? (
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            {/* Left Column: Product Image */}
            <div className="space-y-4">
              <img
                src={`http://127.0.0.1:8000/storage/${product.image}`}
                alt={product.name}
                className="w-full h-auto max-w-md mx-auto object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                onError={(e) => (e.target.src = "/fallback-image.jpg")} // Handles broken images
              />
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-xl font-semibold text-green-600">Price: Rs.{product.price}</p>
              <p className="text-gray-600">Brand: {productBrand?.name || "Unknown"}</p>
              <p className="text-gray-600">Category: {productCategory?.name || "Unknown"}</p>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 bg-gray-200 rounded-l-md cursor-pointer"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                  className="w-16 text-center border-t border-b border-gray-300 focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 bg-gray-200 rounded-r-md cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-colors"
                  onClick={handleAddToCart}
                >
                  Add to Cart 🛒
                </button>
                <button
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                  onClick={handleAddToWishList}
                >
                  Add to Wish List ❤️
                </button>
              </div>
            </div>

            {/* Right Column: Reviews and Details */}
            <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
              {/* Rating Section */}
              <div>
                <h2 className="text-xl font-bold">Customer Reviews</h2>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500 text-2xl">★★★★☆</span>
                  <span className="ml-2 text-gray-700">4.5 out of 5</span>
                </div>
              </div>

              {/* Mock Reviews */}
              <div>
                <h3 className="text-lg font-semibold">Top Reviews</h3>
                <ul className="space-y-4 mt-4">
                  <li>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-gray-600">
                      "Absolutely love this product! It exceeded my expectations in terms of quality and performance. 
                      The delivery was fast, and the packaging was secure. Highly recommend it!"
                    </p>
                  </li>
                  <li>
                    <p className="font-medium">Michael Brown</p>
                    <p className="text-gray-600">
                      "Great value for money. The product works perfectly and has all the features I needed. 
                      Customer support was also very helpful when I had a query."
                    </p>
                  </li>
                  <li>
                    <p className="font-medium">Emily Davis</p>
                    <p className="text-gray-600">
                      "The design is sleek, and the functionality is top-notch. 
                      I've been using it for a month now, and it still performs like new. 
                      Definitely worth the investment!"
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Product not found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;