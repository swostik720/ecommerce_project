import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProductCreate = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brandId, setBrandId] = useState("");
  const [brands, setBrands] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch brands for selection
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // Create a preview URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("brand_id", brandId);
    if (image) {
      formData.append("image", image); // Append the image file
    }

    try {
      await fetch("http://127.0.0.1:8000/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
        },
        body: formData, // Send FormData instead of JSON
      });
      navigate("/product-list");
    } catch (error) {
      console.error("Error creating product:", error);
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
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
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
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          onChange={handleImageChange}
          className="border p-2 w-full mb-2"
        />
        {preview && <img src={preview} alt="Preview" className="w-32 h-32 mt-2" />}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2">
          Save
        </button>
      </form>
    </div>
    <Footer />
    </div>
  );
};

export default ProductCreate;