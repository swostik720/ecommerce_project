import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error("Error fetching products:", err);
        toast.error("Failed to fetch products. Please try again.", {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
      });

    fetch("http://127.0.0.1:8000/api/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((err) => {
        console.error("Error fetching brands:", err);
        toast.error("Failed to fetch brands. Please try again.", {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
      });

    fetch("http://127.0.0.1:8000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => {
        console.error("Error fetching categories:", err);
        toast.error("Failed to fetch categories. Please try again.", {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
          },
        });
        setProducts(products.filter((product) => product.id !== id));
        toast.success("Product deleted successfully!", {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product. Please try again.", {
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
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg mb-4"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <Link to="/product-create" className="bg-green-600 text-white px-4 py-2 rounded-lg">
          Add Product
        </Link>
        <ul className="mt-4">
          {products.map((product) => {
            const productBrand = brands.find((brand) => brand.id === product?.brand_id);
            const productCategory = productBrand ? categories.find((category) => category.id === productBrand.category_id) : null;

            return (
              <li key={product.id} className="flex justify-between p-2 border-b">
                <img
                  src={`http://127.0.0.1:8000/storage/${product.image}`}
                  alt={product.name}
                  className="w-16 h-16"
                />
                <div>
                  {product.name} (Brand: {productBrand?.name || "Unknown"} | Category: {productCategory?.name || "Unknown"})
                </div>
                <div>
                  <Link to={`/product-edit/${product.id}`} className="text-blue-600 mr-2">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600">
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;
