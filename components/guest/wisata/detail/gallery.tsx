"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

export default function Gallery() {
  return (
    <div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        loop={true}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper py-10"
      >
        <SwiperSlide className="my-10">
          <img
            src="https://swiperjs.com/demos/images/nature-1.jpg"
            className="rounded-md"
          />
        </SwiperSlide>
        <SwiperSlide className="my-10">
          <img
            src="https://swiperjs.com/demos/images/nature-2.jpg"
            className="rounded-md"
          />
        </SwiperSlide>
        <SwiperSlide className="my-10">
          <img
            src="https://swiperjs.com/demos/images/nature-3.jpg"
            className="rounded-md"
          />
        </SwiperSlide>
        <SwiperSlide className="my-10">
          <img
            src="https://swiperjs.com/demos/images/nature-4.jpg"
            className="rounded-md"
          />
        </SwiperSlide>
        <SwiperSlide className="my-10">
          <img
            src="https://swiperjs.com/demos/images/nature-5.jpg"
            className="rounded-md"
          />
        </SwiperSlide>
        <SwiperSlide className="my-10">
          <img
            src="https://swiperjs.com/demos/images/nature-6.jpg"
            className="rounded-md"
          />
        </SwiperSlide>
        <SwiperSlide className="my-10">
          <img
            src="https://swiperjs.com/demos/images/nature-7.jpg"
            className="rounded-md"
          />
        </SwiperSlide>
        <SwiperSlide className="my-10">
          <img
            src="https://swiperjs.com/demos/images/nature-8.jpg"
            className="rounded-md"
          />
        </SwiperSlide>
        <SwiperSlide className="my-10">
          <img
            src="https://swiperjs.com/demos/images/nature-9.jpg"
            className="rounded-md"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
