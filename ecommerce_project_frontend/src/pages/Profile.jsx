import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mb-4"
          >
            ← Back
          </button>
          <img
            src="/user_avatar.png"
            alt="User Avatar"
            className="w-24 h-24 mx-auto rounded-full border-4 border-gray-300"
          />
          <h2 className="text-xl font-bold mt-4 text-center">{user.name}</h2>
          <p className="text-gray-600 text-center">{user.email}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg shadow-md hover:bg-blue-600 block mx-auto"
            onClick={() => navigate("/wishlist")}
          >
            My WishList ❤️
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg shadow-md hover:bg-blue-600 block mx-auto"
            onClick={() => navigate("/resetPassword")}
          >
            Change Password
          </button>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
