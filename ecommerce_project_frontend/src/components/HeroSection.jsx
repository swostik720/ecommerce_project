import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  { src: "/slide1.jpg", text: "Discover Clarity with Our Premium Lenses" },
  { src: "/slide2.webp", text: "Vision Redefined, Style Amplified" },
  { src: "/slide3.jpg", text: "See the World in High Definition" },
  { src: "/slide4.jpg", text: "Your Eyes Deserve the Best Care" },
  { src: "/slide5.jpg", text: "Innovative Optics for Every Lifestyle" },
  { src: "/slide6.jpg", text: "Elegance Meets Precision in Eyewear" },
  { src: "/slide7.jpg", text: "Sharp Vision, Unmatched Comfort" },
];

const HeroSection = () => {
  return (
    <section className="w-full h-screen relative pt-18">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="w-full h-full"
      >
        {images.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            {/* Image */}
            <img
              src={slide.src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gray bg-opacity-40 flex flex-col items-center justify-center text-center text-white px-6">
              <h2 className="text-4xl font-bold drop-shadow-lg mb-4">{slide.text}</h2>
              <a
                href="/shop"
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all"
              >
                Explore Now
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;