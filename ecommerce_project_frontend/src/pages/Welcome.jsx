import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import AboutUs from "../components/AboutUs";
import Faq from "../components/Faq";
import ContactUs from "../components/ContactUs";
import Categories from "../components/Categories"; // New Component
import BestSellingProducts from "../components/BestSellingProducts"; // New Component

const Welcome = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
        {/* Our Categories Section */}
          <Categories />

        {/* Best Selling Products Section */}
          <BestSellingProducts />

        {/* About Us Section */}
        <section id="aboutus" className="mb-12">
          <AboutUs />
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-12">
          <Faq />
        </section>

        {/* Contact Us Section */}
        <section id="contactus" className="mb-12">
          <ContactUs />
        </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Welcome;