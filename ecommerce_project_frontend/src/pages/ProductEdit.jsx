import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductEdit = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brandId, setBrandId] = useState("");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setPrice(data.price);
        setDescription(data.description);
        setBrandId(data.brand_id);
        setPreview(`http://127.0.0.1:8000/storage/${data.image}`);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        toast.error("Failed to fetch product details. Please try again.", {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
      });

    fetch("http://127.0.0.1:8000/api/brands", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        Accept: "application/json",
      },
    })
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

    fetch("http://127.0.0.1:8000/api/categories", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        Accept: "application/json",
      },
    })
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
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("brand_id", brandId);
    if (image) {
      formData.append("image", image);
    }

    try {
      await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        },
        body: formData,
      });
      toast.success("Product updated successfully!", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
      navigate("/product-list");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.", {
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
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg mb-4"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Product Name"
            className="border p-2 w-full mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            className="border p-2 w-full mb-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="border p-2 w-full mb-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="border p-2 w-full mb-2"
            value={brandId}
            onChange={(e) => setBrandId(e.target.value)}
            required
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => {
              const category = categories.find((cat) => cat.id === brand.category_id);
              return (
                <option key={brand.id} value={brand.id}>
                  {brand.name} {category ? `(${category.name})` : ""}
                </option>
              );
            })}
          </select>

          <input type="file" onChange={handleImageChange} className="border p-2 w-full mb-2" />
          {preview && <img src={preview} alt="Preview" className="w-32 h-32 mt-2" />}

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2">
            Save Changes
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ProductEdit;
