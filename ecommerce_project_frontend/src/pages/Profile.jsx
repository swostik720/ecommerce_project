import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaMapMarkerAlt, FaCalendarAlt, FaStar, FaHeart, FaBox, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
            Accept: "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 to-white">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="p-6 pt-24">
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white py-10 px-4 flex justify-center items-start">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-lg w-full space-y-6 transition-all duration-500 hover:shadow-blue-200">
            {/* Back Button */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate(-1)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mb-4"
              >
                ← Back
              </button>
              <FaCog className="text-gray-500 hover:text-gray-700 cursor-pointer" />
            </div>

            {/* Avatar and User Info */}
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <img
                  src="/user_avatar.png"
                  alt="User Avatar"
                  className="w-28 h-28 rounded-full border-4 border-blue-100 shadow-lg"
                />
                <span className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white animate-pulse"></span>
              </div>
              <h2 className="text-2xl font-bold mt-4 text-gray-800">{user.name}</h2>
              <p className="text-gray-500 text-sm">{user.email}</p>
              <span className="mt-2 inline-block bg-yellow-100 text-yellow-800 px-3 py-1 text-xs rounded-full font-semibold shadow-sm animate-pulse">
                🥇 Premium Member
              </span>
            </div>

            {/* Extra Info */}
            <div className="grid grid-cols-1 gap-4 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500" />
                <span>Address: 123, Eye Street, Vision City</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-500" />
                <span>Joined: January 15, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                <span>Loyalty Points: <strong>1200 XP</strong></span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => navigate("/order")}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-all duration-300"
              >
                <FaBox /> My Orders
              </button>
              <button
                onClick={() => navigate("/wishlist")}
                className="flex items-center justify-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-600 transition-all duration-300"
              >
                <FaHeart /> My Wishlist
              </button>
              <button
                onClick={() => navigate("/resetPassword")}
                className="flex items-center justify-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-900 transition-all duration-300"
              >
                🔒 Change Password
              </button>
            </div>

            {/* Static Panel */}
            <div className="mt-6 border-t pt-4 text-xs text-center text-gray-400">
              <p>Last updated: April 25, 2025</p>
              <p className="mt-1">
                Want to connect?{" "}
                <a href="/#contactus" className="cursor-pointer hover:underline text-blue-500">
                  Contact Us
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
