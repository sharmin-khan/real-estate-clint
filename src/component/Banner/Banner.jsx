import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Only Autoplay used
import "swiper/css";

import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import banner3 from "../../assets/images/banner3.jpg";

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
          <div className="absolute  inset-0 bg-[rgba(0,0,0,0.4)]  flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-transparent bg-clip-text bg-gradient-to-br from-green-600 via-white to-green-700 text-2xl md:text-5xl font-bold text-center">
              Discover Your Dream Property
            </h2>
            <p className="text-sm px-6 md:px-0 mt-3 md:text-lg max-w-xl">
              Explore verified listings, connect with trusted agents, and make
              your real estate journey smooth and successful with PropEase.
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
