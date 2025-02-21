import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetching categories and brands
        fetch("http://127.0.0.1:8000/api/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data));

        fetch("http://127.0.0.1:8000/api/brands")
            .then((res) => res.json())
            .then((data) => setBrands(data));

        fetchProducts();
    }, []);

    // Fetching products
    const fetchProducts = () => {
        fetch("http://127.0.0.1:8000/api/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    };

    /** 
     * Filter brands based on selected categories
     * If no category is selected, show all brands
     */
    const filteredBrands = selectedCategories.length
        ? brands.filter((brand) => selectedCategories.includes(brand.category_id))
        : brands;

    /** 
     * Filter products based on selected categories and brands
     * If nothing is selected, show all products
     */
    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategories.length === 0 || selectedCategories.includes(product.brand.category_id);
        const matchesBrand =
            selectedBrands.length === 0 || selectedBrands.includes(product.brand_id);
    
        return matchesCategory && matchesBrand;
    });

    return (
        <div>
            <Navbar />
            <div className="flex">
                {/* Sidebar */}
                <div className="w-1/4 p-4 border-r bg-gray-200 h-screen top-0 left-0 pt-20 overflow-y-auto">
                    {/* Categories */}
                    <h2 className="font-bold mb-2">Categories</h2>
                    {categories.map((category) => (
                        <div key={category.id}>
                            <input
                                type="checkbox"
                                value={category.id}
                                checked={selectedCategories.includes(category.id)}
                                onChange={(e) =>
                                    setSelectedCategories((prev) =>
                                        e.target.checked
                                            ? [...prev, category.id]
                                            : prev.filter((id) => id !== category.id)
                                    )
                                }
                            />
                            <label className="ml-2">{category.name}</label>
                        </div>
                    ))}

                    {/* Brands */}
                    <h2 className="font-bold mt-4 mb-2">Brands</h2>
                    {filteredBrands.map((brand) => {
                        const category = categories.find((cat) => cat.id === brand.category_id); // Get category based on brand's category_id
                        return (
                            <div key={brand.id}>
                                <input
                                    type="checkbox"
                                    value={brand.id}
                                    checked={selectedBrands.includes(brand.id)}
                                    onChange={(e) =>
                                        setSelectedBrands((prev) =>
                                            e.target.checked
                                                ? [...prev, brand.id]
                                                : prev.filter((id) => id !== brand.id)
                                        )
                                    }
                                />
                                {/* Show both brand and category name */}
                                <label className="ml-2">
                                    {brand.name} {category ? `(${category.name})` : "(No Category)"}
                                </label>
                            </div>
                        );
                    })}
                </div>

                {/* Products List */}
                <div className="w-3/4 p-4 pt-20">
                    <div className="grid grid-cols-2 gap-4">
                        {filteredProducts.map((product) => {
                            // Get the brand and category for the product
                            const productBrand = brands.find((brand) => brand.id === product.brand_id);
                            const productCategory = productBrand ? categories.find((cat) => cat.id === productBrand.category_id) : null;

                            return (
                                <div key={product.id} className="border p-4 flex">
                                    <img
                                        src={`http://127.0.0.1:8000/storage/${product.image}`}
                                        alt={product.name}
                                        className="w-32 h-32 object-cover"
                                    />
                                    <div className="ml-4 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-bold text-lg">{product.name}</h3>
                                            <p className="text-gray-700">Rs. {product.price}</p>
                                            <p className="text-gray-600">{productBrand?.name}</p>
                                        </div>

                                        {/* Display category name */}
                                        <div className="flex justify-center items-center mt-4">
                                            {productCategory && (
                                                <div className="text-center mx-2 p-2 border rounded-lg">
                                                    <p className="text-sm text-gray-500">{productCategory.name}</p>
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600"
                                            onClick={() => navigate(`/product/details/${product.id}`)}
                                        >
                                            View Product
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Shop;
