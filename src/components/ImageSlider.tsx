import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import styled from "styled-components";

const ImageSlider = () => {
  const imageUrls = [
    "https://placeimg.com/640/123/any",
    "https://placeimg.com/640/225/any",
    "https://placeimg.com/640/423/any",
  ];

  return (
    <CustomSwiper
      spaceBetween={50}
      slidesPerView={1}
      modules={[Pagination, Autoplay]}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
    >
      {imageUrls.map((imageUrl, index) => (
        <SwiperSlide key={index}>
          <img src={imageUrl} alt={`Image ${index + 1}`} />
        </SwiperSlide>
      ))}
    </CustomSwiper>
  );
};

export default ImageSlider;

const CustomSwiper = styled(Swiper)`
  width: 100%;
  height: 100vh;
  /* position: sticky; */
  /* top: 0; */
  .swiper-pagination-bullet {
    border-radius: 1px;
    width: 100px;
    height: 7px;
    left: 508px;
    top: 929px;
    background: #f5efe9;
    border-radius: 1px;
  }
  .swiper-pagination-bullet-active {
    background: #00ab89;
  }

  img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }
`;
