import React from "react";
import { useNavigate } from "react-router-dom";

const BestSellingProducts = () => {
  // Example best-selling products array. Replace with dynamic data from an API if needed.
  const bestSellingProducts = [
    {
      id: 1,
      name: "Ray-Ban Aviator Classic",
      price: "Rs. 159.99",
      image: "/rayban-aviator.avif",
    },
    {
      id: 2,
      name: "Oakley Holbrook",
      price: "Rs. 120.00",
      image: "/oakley-holbrook.jpg",
    },
    {
      id: 3,
      name: "Maui Jim Peahi",
      price: "Rs. 220.00",
      image: "/mauijim-peahi.webp",
    },
    {
      id: 6,
      name: "Ray-Ban Round Metal Eyeglasses",
      price: "Rs. 145.00",
      image: "/rayban-round.avif",
    },
    {
      id: 11,
      name: "Acuvue Oasys",
      price: "Rs. 39.99",
      image: "/acuvue-oasys.jpg",
    },
    {
      id: 16,
      name: "Nike Vision Pivotal",
      price: "Rs. 120.00",
      image: "/nike-pivotal.webp",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="py-16 px-6 md:px-20">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-12 border-b-2 pb-4">
        Best Selling Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {bestSellingProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-72 object-cover object-center rounded-tl-xl rounded-tr-xl"
              />
            </div>
            <div className="p-6 flex flex-col justify-between">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-lg font-medium text-gray-600 mb-4">{product.price}</p>
              <button
                onClick={() => navigate(`/product/details/${product.id}`)}
                className="self-start bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-300 transform hover:scale-105"
              >
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellingProducts;
