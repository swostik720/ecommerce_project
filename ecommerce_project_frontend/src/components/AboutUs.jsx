import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-white py-16 px-4 md:px-16  text-blue-900">
      <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8 border-b-2 pb-4">About Us</h2>

        {/* Section 1 */}
        <div className="flex flex-col md:flex-row items-center mb-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-blue-500 mb-4">Who We Are</h2>
            <p className="text-gray-700 text-lg">
              SBS Optics is dedicated to providing high-quality optical lenses and eyewear solutions. Our mission is to bring clarity to your vision with advanced technology and premium materials.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
            <img
              src="/aboutus1.jpg"
              alt="About Us"
              className="rounded-lg shadow-lg w-full max-w-md"
            />
          </div>
        </div>
        
        {/* Section 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center mb-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-blue-500 mb-4">Our Vision</h2>
            <p className="text-gray-700 text-lg">
              We aim to revolutionize the optics industry by offering innovative and sustainable eyewear solutions that enhance lives worldwide.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
            <img
              src="/aboutus2.jpg"
              alt="Our Vision"
              className="rounded-lg shadow-lg w-full max-w-md"
            />
          </div>
        </div>
        
        {/* Section 3 */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-blue-500 mb-4">Why Choose Us</h2>
            <p className="text-gray-700 text-lg">
              - High-quality lenses with cutting-edge technology<br/>
              - Customer-centric approach ensuring satisfaction<br/>
              - Sustainable and eco-friendly optical solutions
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
            <img
              src="/aboutus3.jpg"
              alt="Why Choose Us"
              className="rounded-lg shadow-lg w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
