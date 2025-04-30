import React from "react";
import { Link } from "react-scroll";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-white via-blue-50 to-blue-100 py-16 px-4 md:px-16 text-blue-900 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}
        <h2 className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500 animate-fade-in">
          About Us
        </h2>

        {/* Section 1: Who We Are */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
          <div className="flex justify-center items-center">
            <img
              src="/aboutus1.jpg"
              alt="About Us"
              className="rounded-3xl shadow-2xl w-full max-w-md object-cover transition-transform duration-500 transform hover:scale-105 hover:shadow-3xl"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-semibold text-blue-600 mb-4">Who We Are</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              SBS Optics is dedicated to providing high-quality optical lenses and eyewear solutions. Our mission is to bring clarity to your vision with advanced technology and premium materials. We’re more than just eyewear – we’re passionate about enhancing the world around us.
            </p>
          </div>
        </div>

        {/* Section 2: Our Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
          <div className="flex justify-center items-center order-2 md:order-1">
            <img
              src="/aboutus2.jpg"
              alt="Our Vision"
              className="rounded-3xl shadow-2xl w-full max-w-md object-cover transition-transform duration-500 transform hover:scale-105 hover:shadow-3xl"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4 order-1 md:order-2">
            <h2 className="text-3xl font-semibold text-blue-600 mb-4">Our Vision</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We aim to revolutionize the optics industry by offering innovative and sustainable eyewear solutions that enhance lives worldwide. Our vision is to make eyewear a seamless blend of style, comfort, and advanced technology, all while being environmentally responsible.
            </p>
          </div>
        </div>

        {/* Section 3: Why Choose Us */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-semibold text-blue-600 mb-4">Why Choose Us</h2>
            <ul className="text-lg text-gray-700 space-y-2 pl-6 list-disc">
              <li>High-quality lenses with cutting-edge technology</li>
              <li>Customer-centric approach ensuring satisfaction</li>
              <li>Sustainable and eco-friendly optical solutions</li>
              <li>Customization options to suit your unique style</li>
              <li>100% satisfaction guarantee on all products</li>
            </ul>
          </div>
          <div className="flex justify-center items-center">
            <img
              src="/aboutus3.jpg"
              alt="Why Choose Us"
              className="rounded-3xl shadow-2xl w-full max-w-md object-cover transition-transform duration-500 transform hover:scale-105 hover:shadow-3xl"
            />
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="text-center mb-16">
          <h3 className="text-4xl font-semibold text-blue-600 mb-8">What Our Customers Say</h3>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full sm:w-80 text-center transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
              <p className="text-lg text-gray-700 italic">
                "SBS Optics transformed the way I see the world. The lenses are incredibly clear, and I love the eco-friendly options. I highly recommend their products!"
              </p>
              <p className="mt-4 text-blue-600 font-bold">- Sarah L.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full sm:w-80 text-center transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
              <p className="text-lg text-gray-700 italic">
                "The quality is unmatched! I’ve never had eyewear this comfortable. SBS Optics’ customer service is also top-notch."
              </p>
              <p className="mt-4 text-blue-600 font-bold">- John D.</p>
            </div>
          </div>
        </div>

        {/* Interactive Timeline */}
        <div className="bg-blue-50 p-12 rounded-3xl shadow-2xl mb-16">
          <h3 className="text-4xl font-semibold text-blue-600 mb-8 text-center">Our Journey So Far</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-full inline-block mb-4 shadow-xl">
                <span className="text-2xl font-bold">2015</span>
              </div>
              <p className="text-lg text-gray-700">Founded with a vision to innovate eyewear technology.</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-full inline-block mb-4 shadow-xl">
                <span className="text-2xl font-bold">2018</span>
              </div>
              <p className="text-lg text-gray-700">Launched our first eco-friendly eyewear collection.</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-full inline-block mb-4 shadow-xl">
                <span className="text-2xl font-bold">2021</span>
              </div>
              <p className="text-lg text-gray-700">Awarded as the most innovative eyewear company.</p>
            </div>
          </div>
        </div>

        {/* Meet Our Team */}
        <div className="text-center mb-16">
          <h3 className="text-4xl font-semibold text-blue-700 mb-12">Meet Our Team</h3>
          <div className="flex flex-wrap justify-center gap-12">
            {/* Team Member 1 */}
            <div className="w-full sm:w-72 md:w-80 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-white p-6 rounded-2xl shadow-lg">
              <img
                src="/team1.jpeg"
                alt="Alice Johnson"
                className="rounded-full w-48 h-48 mx-auto mb-6 border-4 border-blue-200 hover:border-blue-400 transition duration-300"
              />
              <h4 className="font-semibold text-xl text-blue-600 mb-2">Alice Johnson</h4>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            {/* Team Member 2 */}
            <div className="w-full sm:w-72 md:w-80 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-white p-6 rounded-2xl shadow-lg">
              <img
                src="/team3.avif"
                alt="Mark Lee"
                className="rounded-full w-48 h-48 mx-auto mb-6 border-4 border-blue-200 hover:border-blue-400 transition duration-300"
              />
              <h4 className="font-semibold text-xl text-blue-600 mb-2">Mark Lee</h4>
              <p className="text-gray-600">Chief Technology Officer</p>
            </div>
            {/* Team Member 3 */}
            <div className="w-full sm:w-72 md:w-80 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-white p-6 rounded-2xl shadow-lg">
              <img
                src="/team2.jpg"
                alt="Emma Brown"
                className="rounded-full w-48 h-48 mx-auto mb-6 border-4 border-blue-200 hover:border-blue-400 transition duration-300"
              />
              <h4 className="font-semibold text-xl text-blue-600 mb-2">Emma Brown</h4>
              <p className="text-gray-600">Head of Customer Success</p>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default AboutUs;
