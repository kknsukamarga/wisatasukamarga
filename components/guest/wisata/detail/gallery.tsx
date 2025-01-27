"use client";

import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

export default function Gallery({ images }) {
  const [showModal, setShowModal] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);

  const handleImageClick = (index) => {
    setInitialSlide(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {/* Main Gallery Swiper */}
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
        className="mySwiper"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="my-10">
            <Image
              src={src}
              alt={`Gallery Image ${index + 1}`}
              width={800}
              height={600}
              className="rounded-md cursor-pointer object-cover md:cursor-grab w-full h-full min-h-[200px] md:min-h-[500px] max-h-96"
              onClick={() => handleImageClick(index)} // Open modal with selected image
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal with Swiper */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative w-full max-w-3xl">
            <button
              className="absolute top-2 right-2 text-white bg-gray px-2.5 py-1 rounded-full z-50"
              onClick={closeModal}
            >
              ✕
            </button>
            <Swiper
              navigation={true}
              pagination={{ clickable: true }}
              loop={true}
              modules={[Pagination, Navigation]}
              initialSlide={initialSlide} // Start with selected image
              className="modalSwiper"
            >
              {images.map((src, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={src}
                    alt={`Gallery Image ${index + 1}`}
                    width={800}
                    height={600}
                    className="rounded-md max-h-[500px] object-cover object-center"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
}
