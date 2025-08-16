import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Only Autoplay used
import "swiper/css";

import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner1.jpeg";
import banner3 from "../../assets/images/banner2.jpg";
import { Link } from "react-router";

const images = [banner1, banner2, banner3];

const Banner = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 3000 }}
      loop={true}
      className="w-full h-64 md:h-[450px] rounded-lg overflow-hidden"
    >
      {images.map((img, idx) => (
        <SwiperSlide key={idx}>
          <img
            src={img}
            alt={`Slide ${idx + 1}`}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gray-900/50 flex flex-col items-center justify-center text-white text-center
            md:items-start md:text-left md:px-16"
          >
            <h2 className="text-transparent bg-clip-text bg-gradient-to-br from-green-600 via-white to-green-700 text-2xl md:text-5xl font-bold mb-4">
              Discover Your Dream Property
            </h2>
            <p className="text-sm md:text-lg max-w-xl mb-6">
              Explore verified listings, connect with trusted agents, and make
              your real estate journey smooth and successful with PropEase.
            </p>
            <Link to='/all-properties' className="px-6 py-2 bg-green-500 rounded-full font-semibold text-white transition">
              Discover Your Property
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
