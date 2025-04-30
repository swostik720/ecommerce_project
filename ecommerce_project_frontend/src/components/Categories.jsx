import React from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "Sun Glasses", image: "/sun_glass.jpeg", description: "Protect your eyes in style with our trendy sunglasses." },
    { id: 2, name: "Eye Glasses", image: "/eye_glass.jpg", description: "Clear vision, stylish frames for everyday use." },
    { id: 3, name: "Eye Lenses", image: "/eye_lens.jpg", description: "High-quality lenses for comfort and clarity." },
    { id: 4, name: "Sports Eyewear", image: "/sport_eyewear.jpg", description: "Durable and comfortable eyewear for sports enthusiasts." },
    { id: 5, name: "Computer Glasses", image: "/computer_glass.jpg", description: "Protect your eyes from screen glare and blue light." },
    { id: 6, name: "Prescription Glasses", image: "/prescription_glass.jpg", description: "Custom prescription lenses tailored for your vision needs." },
  ];

  return (
    <div className="py-16 px-6 lg:px-20 bg-gradient-to-r from-white to-blue-50">
      <h2 className="text-5xl font-extrabold text-center text-blue-900 mb-12 tracking-wide">
        Our Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover transition-transform duration-300 ease-in-out"
            />
            <div className="p-6 flex flex-col justify-between h-[220px]">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4 text-center transform transition-all duration-300 hover:text-blue-800 hover:scale-105 hover:tracking-wider">
                {category.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 text-center">{category.description}</p>
              <button
                onClick={() => navigate("/shop")}
                className="mx-auto bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-lg px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <i className="fas fa-shopping-cart mr-2"></i> Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
