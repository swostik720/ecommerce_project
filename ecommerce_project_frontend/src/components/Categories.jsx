import React from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "Sun Glasses", image: "/sun_glass.jpeg" },
    { id: 2, name: "Eye Glasses", image: "/eye_glass.jpg" },
    { id: 3, name: "Eye Lenses", image: "/eye_lens.jpg" },
    { id: 4, name: "Sports Eyewear", image: "/sport_eyewear.jpg" },
    { id: 5, name: "Computer Glasses", image: "/computer_glass.jpg" },
    { id: 6, name: "Prescription Glasses", image: "/prescription_glass.jpg" },
  ];

  return (
    <div className="py-16 px-6 lg:px-20 bg-gradient-to-r from-white to-blue-50">
      <h2 className="text-4xl font-bold text-center text-blue-900 mb-14 border-b-4 pb-4">
        Explore Our Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex flex-col justify-between h-[180px]">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                {category.name}
              </h3>
              <button
                onClick={() => navigate("/shop")}
                className="mx-auto bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-2 rounded-full transition-all duration-300 shadow-md"
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
