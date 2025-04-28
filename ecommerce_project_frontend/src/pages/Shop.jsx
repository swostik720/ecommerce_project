import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import icons

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [sortOption, setSortOption] = useState(""); // Sorting option
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
    const productsPerPage = 6; // Number of products per page

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

    // Ensure brands are shown only once, even if they belong to different categories
    const uniqueFilteredBrands = Array.from(
        new Map(filteredBrands.map((brand) => [brand.name, brand])).values()
    );

    /** 
     * Filter products based on selected categories and brands
     * If nothing is selected, show all products
     */
    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategories.length === 0 || selectedCategories.includes(product.brand.category_id);

        const matchesBrand =
            selectedBrands.length === 0 ||
            selectedBrands.some((brand) => brand === product.brand.name || brand === product.brand_id); // Filter by brand name and brand_id

        // Case 1: If no category is selected, show all products for the selected brand(s)
        if (selectedBrands.length > 0 && selectedCategories.length === 0) {
            return selectedBrands.some(
                (brand) => brand === product.brand.name || brand === product.brand_id
            ); // Only filter by brand name and brand_id
        }

        // Case 2: If both category and brand are selected, show products matching both
        return matchesCategory && matchesBrand;
    });

    /** 
     * Sort products based on the selected option
     */
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
            case "price-high-to-low":
                return b.price - a.price;
            case "price-low-to-high":
                return a.price - b.price;
            case "a-z":
                return a.name.localeCompare(b.name);
            case "z-a":
                return b.name.localeCompare(a.name);
            default:
                return 0; // No sorting
        }
    });

    // Pagination Logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    };

    const handlePrevPage = () => {
        setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="p-6 pt-20">
                <div className="flex">
                    {/* Sidebar */}
                    <div className="w-1/4 p-6 bg-white shadow-md h-screen overflow-y-auto sticky top-0">
                        {/* Categories */}
                        <h2 className="font-bold text-xl mb-4">Categories</h2>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <div key={category.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={category.id}
                                        checked={selectedCategories.includes(category.id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedCategories((prev) => [...prev, category.id]);
                                            } else {
                                                setSelectedCategories((prev) =>
                                                    prev.filter((id) => id !== category.id)
                                                );
                                            }
                                            setSelectedBrands([]); // Reset brands if category changes
                                        }}
                                        className="mr-2"
                                    />
                                    <label className="text-gray-700">{category.name}</label>
                                </div>
                            ))}
                        </div>

                        {/* Brands */}
                        <h2 className="font-bold text-xl mt-6 mb-4">Brands</h2>
                        <div className="space-y-2">
                            {uniqueFilteredBrands.map((brand) => (
                                <div key={brand.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={brand.name}
                                        checked={selectedBrands.includes(brand.name)}
                                        onChange={(e) => {
                                            if (e.target.checked && selectedCategories.length === 0) {
                                                setSelectedBrands([brand.name]); // Clear other brands when selecting a brand with no category
                                            } else {
                                                setSelectedBrands((prev) =>
                                                    e.target.checked
                                                        ? [...prev, brand.name]
                                                        : prev.filter((name) => name !== brand.name)
                                                );
                                            }
                                        }}
                                        className="mr-2"
                                    />
                                    <label className="text-gray-700">{brand.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Products List */}
                    <div className="w-3/4 p-6">
                        {/* Sorting Dropdown */}
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">Products</h1>
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Sort By</option>
                                <option value="price-high-to-low">Price (High to Low)</option>
                                <option value="price-low-to-high">Price (Low to High)</option>
                                <option value="a-z">Name (A-Z)</option>
                                <option value="z-a">Name (Z-A)</option>
                            </select>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentProducts.map((product) => {
                                const productBrand = brands.find((brand) => brand.name === product.brand.name);
                                const productCategory = productBrand
                                    ? categories.find((cat) => cat.id === productBrand.category_id)
                                    : null;

                                return (
                                    <div
                                        key={product.id}
                                        className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <img
                                            src={`http://127.0.0.1:8000/storage/${product.image}`}
                                            alt={product.name}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                                            <p className="text-gray-600 mt-2">Rs. {product.price}</p>
                                            <button
                                                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                                                onClick={() => navigate(`/product/details/${product.id}`)}
                                            >
                                                View Product
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-center mt-6 space-x-4">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l-md flex items-center disabled:bg-gray-100 disabled:text-gray-400"
                            >
                                <FaArrowLeft className="mr-2" /> Previous
                            </button>
                            <span className="px-4 py-2 bg-gray-200 text-gray-700">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md flex items-center disabled:bg-gray-100 disabled:text-gray-400"
                            >
                                Next <FaArrowRight className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Shop;