import React from "react";
import { useNavigate } from "react-router-dom";

const BestSellingProducts = () => {
  const bestSellingProducts = [
    {
      id: 1,
      name: "Ray-Ban Aviator Classic",
      price: "Rs. 159.99", // This is the real price
      image: "/rayban-aviator.avif",
    },
    {
      id: 2,
      name: "Oakley Holbrook",
      price: "Rs. 120.00", // Real price
      image: "/oakley-holbrook.jpg",
    },
    {
      id: 3,
      name: "Maui Jim Peahi",
      price: "Rs. 220.00", // Real price
      image: "/mauijim-peahi.webp",
    },
    {
      id: 6,
      name: "Ray-Ban Round Metal Eyeglasses",
      price: "Rs. 145.00", // Real price
      image: "/rayban-round.avif",
    },
    {
      id: 11,
      name: "Acuvue Oasys",
      price: "Rs. 39.99", // Real price
      image: "/acuvue-oasys.jpg",
    },
    {
      id: 16,
      name: "Nike Vision Pivotal",
      price: "Rs. 120.00", // Real price
      image: "/nike-pivotal.webp",
    },
  ];

  const navigate = useNavigate();

  const getDiscountedPrice = (price) => {
    const priceNum = parseFloat(price.replace("Rs. ", ""));
    const extraPrice = 50; // Add Rs. 50 to the original price
    const inflatedPrice = priceNum + extraPrice;
    return inflatedPrice.toFixed(2); // Return the inflated price as a string
  };

  const calculateDiscountPercentage = (realPrice, inflatedPrice) => {
    const real = parseFloat(realPrice.replace("Rs. ", ""));
    const inflated = parseFloat(inflatedPrice);
    const discount = ((inflated - real) / inflated) * 100;
    return discount.toFixed(0); // Return the discount as a rounded percentage
  };

  return (
    <div className="py-16 px-6 md:px-20 bg-gradient-to-r from-blue-50 to-white">
      <h2 className="text-4xl font-extrabold text-center text-blue-900 mb-12">
        Best Selling Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {bestSellingProducts.map((product) => {
          const inflatedPrice = getDiscountedPrice(product.price);
          const discountPercentage = calculateDiscountPercentage(
            product.price,
            inflatedPrice
          );

          return (
            <div
              key={product.id}
              className="relative group bg-white rounded-3xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              

              {/* 🎀 Ribbon with Hover Effect */}
              <div className="absolute top-4 left-[-35px] bg-gradient-to-r from-pink-500 to-red-500 text-white text-sm font-bold py-2 px-12 transform -rotate-45 shadow-lg tracking-wide z-10">
                {/* Default Text: Sale */}
                <span className="group-hover:hidden">Sale</span>
                {/* Hover Text: Discount Percentage */}
                <span className="hidden group-hover:inline">
                  -{discountPercentage}%
                </span>
              </div>

              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-72 object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />

              {/* Product Details */}
              <div className="p-6 flex flex-col justify-between h-[250px]">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center group-hover:text-blue-600">
                  {product.name}
                </h3>

                {/* Display inflated price with strike-through and real price */}
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <p className="text-lg font-medium text-gray-600 line-through">
                    Rs. {inflatedPrice}
                  </p>
                  <p className="text-xl font-bold text-red-600">
                    {product.price}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/product/details/${product.id}`)}
                  className="self-center bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  View Product
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BestSellingProducts;
